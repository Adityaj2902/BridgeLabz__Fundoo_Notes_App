import { Request, Response } from 'express';
import * as registerService from '../services/registerService';

// Register user
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = await registerService.registerUser(firstName, lastName, email, password);

    console.log('New User Registered:', { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email });

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error: any) {
    console.error("Error registering user:", error.message);

    res.status(400).json({ message: error.message });
  }
};

export { registerUser };
