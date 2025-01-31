// const User = require('../models/user');

// const registerUser = async (firstName, lastName, email, password) => {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("Email already in use");
//   }

//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password, 
//   });

//   await newUser.save();
//   return newUser; 
// };

// module.exports = {
//   registerUser,
// };
const bcrypt = require('bcryptjs'); 
const User = require('../models/user');
const registerUser = async (firstName, lastName, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
    });

    await newUser.save();
    return newUser; 
  } catch (error) {
    throw new Error(error.message); 
  }
};

module.exports = {
  registerUser,
};
