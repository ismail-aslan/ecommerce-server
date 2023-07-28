const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { User } = require("../models");
const createToken = require("../utils/createToken");
const { sendEmail } = require("../utils/sendEmail");
const checkType = require("../utils/checkType");

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
    const token = createToken({ email });
    const emailData = {
      verificationUrl: `${process.env.BASE_URL}api/users/${token}`,
    };
    newUser.verificationCode = token;
    try {
      await sendEmail(newUser.id, "activasion", emailData);
    } catch (error) {
      console.log("error", error);
    }

    res.status(200).send({
      status: "success",
      data: {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
      },
    });
  } else {
    return next(new AppError("This email has already been registered.", 400));
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
