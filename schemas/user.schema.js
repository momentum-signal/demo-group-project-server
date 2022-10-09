/* external imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const colors = require("colors");
const crypto = require("crypto");

/* created model schema */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters."],
      maxLength: [100, "First name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
      minLength: [3, "Last name must be at least 3 characters."],
      maxLength: [100, "Last name is too large"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: [true, "Email exists, provide a new"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 4,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    avatar: {
      type: String,
      unique: [true, "Avatar exists, provide a new"],
      default:
        "https://i.pinimg.com/564x/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.jpg",
    },
    contactNumber: {
      type: String,
      validate: {
        validator: (value) => {
          validator.isMobilePhone(`+88${value}`, "bn-BD");
        },
        message: "Phone number {VALUE} is not valid",
      },
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* middlewares to encrypt password */
/**
 * bcrypt.compareSync is always returning false
 * https://angularfixing.com/why-bcrypt-comparesync-always-return-false/
 */
userSchema.pre("save", async function (next) {
  try {
    // hash the password only if the password has been changed or user is new
    if (!this.isModified("password")) {
      next();
      return;
    }

    const hash = bcrypt.hashSync(this.password);
    this.password = hash;
    this.confirmPassword = undefined;
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (next) {
  try {
    console.log(colors.bgMagenta.bold("Password encryption successful"));
  } catch (error) {
    next(error);
  }
});

// userSchema.methods.comparePasswords = function (password, hashedPassword) {
//   const isValidPassword = bcrypt.compareSync(password, hashedPassword);
//   return isValidPassword;
// };

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;

  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

const User = new mongoose.model("Users", userSchema);

module.exports = User;
