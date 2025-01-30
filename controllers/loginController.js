import { Request, Response } from 'express';
import * as loginService from '../services/loginService';

// Login user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Call service layer for login
    await loginService.loginUser(email, password);

    // Send success response
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error: any) {
    console.error("Error logging in user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export { loginUser };

