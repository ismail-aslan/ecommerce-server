const nodemailer = require("nodemailer");
const AppError = require("../utils/appError");
const { User } = require("../models");
const { userVerification } = require("./emailTemplates/userVerification");

const sendEmail = async (userId, type, data, option, customEmail) => {
  try {
    // pull in the nesessary user data from our db
    const userData = await User.findOne({
      where: { id: userId },
      attributes: ["email"],
    });

    // determine correct mail template and mail subject according to type parameter dynamically
    let htmlTemp;
    let mailSubject;

    switch (type) {
      case "activasion":
        htmlTemp = userVerification(userData.email, data.verificationUrl);
        mailSubject = "Activate Account";
        break;
      default:
        htmlTemp = data.customTemplate;
        mailSubject = data.mailSubject;
    }

    // determine the mail to send from and its credentials
    const emailToSendFrom = !option
      ? process.env.NOREPLY_EMAIL_ADDRESS
      : option.email;

    const password = !option
      ? process.env.NOREPLY_EMAIL_PASSWORD //for gmail get an app password from security settings
      : option.password;

    // configure nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: emailToSendFrom,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailToSendFrom,
      to: customEmail ? customEmail : userData.email,
      subject: mailSubject,
      html: htmlTemp,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

exports.sendEmail = sendEmail;
