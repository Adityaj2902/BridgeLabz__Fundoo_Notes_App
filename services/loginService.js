// services/loginService.js
const User = require('./../models/user');

const loginUser = async (email, password) => {
  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if password matches (plain text comparison)
  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return user;  // Returning the user object for further use
};

module.exports = {
  loginUser,
};
