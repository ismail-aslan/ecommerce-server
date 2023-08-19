const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { User } = require("../models");
const createToken = require("../utils/createToken");
const { sendEmail } = require("../utils/sendEmail");
const checkType = require("../utils/checkType");
const verifyToken = require("../utils/verifyToken");
const { USER_ROLE, USER_STATUS } = require("../constants");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, surname, email, password } = req.body;

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
      password: bcrypt.hashSync(password, 10),
      email,
    });
    const verificationCode = createToken({ email });
    const emailData = {
      verificationUrl: `${process.env.BASE_URL}api/v1/users/${verificationCode}`,
    };
    newUser.verificationCode = verificationCode;

    const token = createToken(
      {
        email: newUser.email,
        role: "standard",
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
        status: "pending",
        role: "standard",
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
    //     role: user.userRole,
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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  checkType(email, "string", false);
  checkType(password, "string", false);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return next(
      new AppError("We cannot find an account with that e-mail address.", 400)
    );
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid username or password", 400));
  }

  const token = createToken(
    {
      email: user.email,
      role: user.userRole,
    },
    {
      expiresIn: "1d",
    }
  );

  user.token = token;
  user.save();
  res.status(200).send({
    status: "success",
    data: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      status: user.userStatus,
      role: user.userRole,
      token,
    },
  });
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

exports.updateUserRoleAndStatus = catchAsync(async (req, res, next) => {
  const { role, email, status } = req.body;
  console.log("role, email, status ", role, email, status);
  if (!email || !(role || status)) {
    return next(new AppError("Missing data", 400));
  }
  console.log(
    "role && !USER_ROLE.includes(role)",
    role && !USER_ROLE.includes(role)
  );
  if (role && !USER_ROLE.includes(role)) {
    return next(new AppError("Invalid role", 400));
  }
  if (status && !USER_STATUS.includes(status)) {
    return next(new AppError("Invalid status", 400));
  }
  const result = await User.update(
    {
      userRole: role,
      userStatus: status,
    },
    {
      where: { email },
      returning: true,
    }
  );

  res.status(200).send({
    status: "success",
    data: result[0],
  });
});
