const User = require('../models/user');

const registerUser = async (firstName, lastName, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password, 
  });

  await newUser.save();
  return newUser; 
};

module.exports = {
  registerUser,
};
