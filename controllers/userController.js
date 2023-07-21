const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { User } = require("../models");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  console.log({
    name,
    surname,
    email,
    password,
  });
  if (
    !name ||
    name.trim() === "" ||
    !surname ||
    surname.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return next(new AppError("Missing data", 400));
  }
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
