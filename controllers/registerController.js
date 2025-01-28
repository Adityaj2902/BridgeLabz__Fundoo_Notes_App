const registerService = require('../services/registerService');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = await registerService.registerUser(firstName, lastName, email, password);

        console.log('New User Registered:', { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email });

    res.status(201).json({ message: "User registered successfully!" });

  } 
  catch (error) {

    console.error("Error registering user:", error.message);

    res.status(400).json({ message: error.message });
    
  }
};

module.exports = { registerUser };
