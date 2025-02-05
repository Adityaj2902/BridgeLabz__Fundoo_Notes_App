import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { registerUser, loginUser } from '../services/user.service';
import HttpStatus from 'http-status-codes';

export default class UserController {
  // Controller method to register a user
  public register = async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await registerUser(req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'User registered successfully', user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  // Controller method to login a user
  public login = async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const token = await loginUser(req.body);
      res.status(HttpStatus.OK).json({ message: 'Login successful', token });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  };
}
