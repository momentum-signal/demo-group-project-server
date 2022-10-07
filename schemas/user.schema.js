/* external imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const colors = require("colors");

/* created model schema */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: [true, "Email exists, provide a new"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 5,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: "Password {VALUE} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: (value) => {
          return value === this.password;
        },
        message: "Password {VALUE} won't match",
      },
    },
    avatar: {
      type: String,
      required: [true, "Please post your avatar"],
      unique: [true, "Avatar exists, provide a new"],
    },
    contactNumber: {
      type: String,
      validate: {
        validator: (value) => {
          validator.isMobilePhone("bn-BD", value);
        },
        message: "Phone number {VALUE} is not valid",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
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
userSchema.pre("save", async function (next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
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

const User = new mongoose.model("Users", userSchema);

module.exports = User;
