const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { User } = require("../models");
const createToken = require("../utils/createToken");
const { sendEmail } = require("../utils/sendEmail");
const checkType = require("../utils/checkType");
const verifyToken = require("../utils/verifyToken");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  console.log({
    name,
    surname,
    email,
    password,
  });
  checkType(name, "string", false);
  checkType(surname, "string", false);
  checkType(email, "string", false);
  checkType(password, "string", false);

  const users = await User.findAll({
    where: {
      email: email,
    },
  });

  if (users.length === 0) {
    const newUser = await User.create({
      name,
      surname,
      password: bcrypt.hashSync(password, 8),
      email,
    });
    const verificationCode = createToken({ email });
    const emailData = {
      verificationUrl: `${process.env.BASE_URL}api/v1/users/${verificationCode}`,
    };
    newUser.verificationCode = verificationCode;
    console.log({
      email: newUser.email,
      rol: newUser.userRol,
    });
    const token = createToken(
      {
        email: newUser.email,
        rol: "standard",
      },
      {
        expiresIn: "1d",
      }
    );
    newUser.token = token;
    try {
      await sendEmail(newUser.id, "activasion", emailData);
      newUser.save();
    } catch (error) {
      newUser.destroy();
      return next(new AppError(error.message, 400));
    }

    res.status(200).send({
      status: "success",
      data: {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        userStatus: "pending",
        token,
      },
    });
  } else {
    return next(new AppError("This email has already been registered.", 400));
  }
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  const { verificationCode } = req.params;
  checkType(verificationCode, "string", false);
  try {
    const verification = verifyToken(verificationCode);
    const { email } = verification;
    const user = await User.findOne({
      where: {
        verificationCode,
        email,
      },
    });
    if (user === null) {
      res.redirect(`https://ecommerce.ismailaslan.me/?verified=false`);
    }
    user.verificationCode = null;
    user.verificationDate = Date.now();
    user.userStatus = "active";
    // const token = createToken(
    //   {
    //     email: user.email,
    //     rol: user.userRol,
    //   },
    //   {
    //     expiresIn: "1d",
    //   }
    // );

    // user.token = token;
    await user.save();
    res.redirect(`https://ecommerce.ismailaslan.me/?verified=true`);
  } catch (error) {
    res.redirect(`https://ecommerce.ismailaslan.me/?verified=false`);
  }
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await User.destroy({
    where: { id },
  });

  res.status(204).send({
    status: "success",
  });
});
