const loginService = require('../services/userService');
const registerService = require('../services/userService');
const jwt = require('jsonwebtoken');


// // Login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Call service layer for login
//     const user = await loginService.loginUser(email, password);

//     // Send success response
//     res.status(200).json({
//       message: "Login successful",
//     });

//     // Generate JWT token after successful login
//     const payload = { userId: user._id }; 
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
  

//   } catch (error) {
//     console.error("Error logging in user:", error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer for login
    const user = await loginService.loginUser(email, password);

    // Generate JWT token after successful login
    const payload = { userId: user._id }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Ensure this line exists

    // Set the JWT token in a cookie
    res.cookie('authToken', token, {
      httpOnly: true,  // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production',  // Ensures cookie is sent over HTTPS in production
      maxAge: 3600000,  // Cookie expires in 1 hour (same as JWT token)
      sameSite: 'Strict'  // Helps mitigate CSRF attacks
    });

    // Send success response
    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(400).json({ message: error.message });
  }
};



// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = await registerService.registerUser(firstName, lastName, email, password);

    console.log('New User Registered:', { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email });

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser
};
