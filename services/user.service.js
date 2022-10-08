/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../schemas/user.schema");

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
  const { password, confirmPassword, ...user } = userInfo.toObject();

  if (user) {
    if (bcrypt.compareSync(data.password, password || confirmPassword)) {
      return {
        _redirect: true,
        user,
      };
    } else {
      return { _redirect: false, error: "Password is wrong!" };
    }
  } else {
    return { _redirect: false, error: "User not exist!" };
  }
};
