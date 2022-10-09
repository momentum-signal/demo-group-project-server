/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../schemas/user.schema");
const { getToken } = require("../utilities/token.utility");

exports.displayAllUserServices = async () => {
  const result = await User.find({}).select("-password -confirmPassword");
  return result;
};

exports.registerAnUserService = async (data) => {
  const user = new User(data);
  const result = await user.save();
  return result;
};

exports.loggedAnUserService = async (data) => {
  const userInfo = await User.findOne({
    email: data.email,
  });
  const { password, ...user } = userInfo.toObject();
  const token = getToken(user);

  if (user) {
    const isValidPassword = bcrypt.compareSync(
      data.password.toString(),
      password
    );
    console.log(isValidPassword);
    if (
      // bcrypt.compareSync(data.password, password)
      isValidPassword
    ) {
      return {
        _redirect: true,
        user,
        token,
      };
    } else {
      return { _redirect: false, error: "Password is wrong!" };
    }
  } else {
    return { _redirect: false, error: "User not exist!" };
  }
};
