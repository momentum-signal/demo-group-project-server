/* external import */
const jwt = require("jsonwebtoken");

exports.getToken = (data) => {
  const token = jwt.sign(
    {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
      role: data.role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.DURATION_EXPIRY,
    }
  );

  return token;
};
