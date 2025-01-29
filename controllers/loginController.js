// controllers/loginController.js
const loginService = require('../services/loginService');

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer for login
    const user = await loginService.loginUser(email, password);

    // Send success response
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser };
