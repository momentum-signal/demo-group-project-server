/* external import */
const nodemailer = require("nodemailer");

/* internal imports */
const User = require("../schemas/user.schema");
const {
  registerAnUserService,
  loggedAnUserService,
} = require("../services/user.service");

exports.registerAnUser = async (req, res, next) => {
  try {
    const user = await registerAnUserService(req.body);
    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });

    /**
     * Configure for Google Workplace with Two Factor Authentication (2FA)
     * https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa
     */
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: user.email,
      subject: "Validation code to confirm registration",
      text: `Thank you for creating your account. Please confirm your account here: ${
        req.protocol
      }://${req.get("host")}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New user created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loggedAnUser = async (req, res, next) => {
  try {
    const result = await loggedAnUserService(req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Logged in existing user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.confirmEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ confirmationToken: req.params.token });
    if (!user) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "May be user not exists",
      });
    }

    const expire = new Date() > new Date(user.confirmationTokenExpires);
    if (expire) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "May be token expire",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Registration verification complete",
    });
  } catch (error) {
    next(error);
  }
};
