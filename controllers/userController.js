const { User } = require("../models");
const { USER_ROLE, USER_STATUS } = require("../constants");
const { sendEmail } = require("../utils/sendEmail");
const catchAsync = require("./../utils/catchAsync");
const createToken = require("../utils/createToken");
const checkType = require("../utils/checkType");
const verifyToken = require("../utils/verifyToken");
const throwError = require("../utils/throwError");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");

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
      password: hashPassword(password),
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
      throwError(error.message, 400);
    }

    const responseData = {
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      status: "pending",
      role: "standard",
      token,
    };

    res.status(200).send({ status: "success", data: responseData });
  } else {
    throwError("This email address is already registered.", 400);
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
      res.redirect(`${process.env.CLIENT_BASE_URL}?verified=false`);
    }
    user.verificationCode = null;
    user.verificationDate = Date.now();
    user.userStatus = "active";

    await user.save();

    res.redirect(`${process.env.CLIENT_BASE_URL}?verified=true`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_BASE_URL}?verified=false`);
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

  const isPasswordCorrect = comparePassword(password, user.password);
  if (!user || !isPasswordCorrect) {
    throwError("Invalid email address or password.", 400);
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

  const responseData = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    status: user.userStatus,
    role: user.userRole,
    token,
  };

  res.status(200).send({ status: "success", data: responseData });
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

  if (!email || !(role || status)) {
    throwError("Missing data", 400);
  }

  if (role && !USER_ROLE.includes(role)) {
    throwError("Invalid role", 400);
  }
  if (status && !USER_STATUS.includes(status)) {
    throwError("Invalid status", 400);
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
