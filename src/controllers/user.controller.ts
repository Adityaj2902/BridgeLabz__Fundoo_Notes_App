import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendResetPasswordEmail } from '../utils/mailer';
import { registerUser, loginUser , findUserByEmail, updateUserPassword } from '../services/user.service';
import { generateResetPasswordToken, verifyResetPasswordToken } from '../utils/resetPassword.util';
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


  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await findUserByEmail(req.body.email);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      const token = generateResetPasswordToken({ email: user.email }, process.env.RESET_PASSWORD_SECRET);
      sendResetPasswordEmail(user.email, token);
      res.status(HttpStatus.OK).json({ message: 'Password reset token sent to email' });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };


  // Controller method to handle reset password
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const decoded = verifyResetPasswordToken(req.body.token,process.env.RESET_PASSWORD_SECRET);
      const email = decoded.email;
      await updateUserPassword(email, req.body.newPassword);
      res.status(HttpStatus.OK).json({ message: 'Password reset successfully' });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
}
