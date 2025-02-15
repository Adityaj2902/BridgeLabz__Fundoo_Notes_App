import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpStatus from "http-status-codes";
import dotenv from "dotenv";
import { sendResetPasswordEmail } from "../utils/mailer";
import { UserService } from "../services/user.service";
import connectRabbitMQ from "../config/rabbitmq"; // Import RabbitMQ connection

import {
  generateResetPasswordToken,
  verifyResetPasswordToken,
} from "../utils/resetPassword.util";

dotenv.config();

const userService = new UserService();

export default class UserController {
  public register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await userService.registerUser(req.body);

      // Publish message to RabbitMQ
      const channel = await connectRabbitMQ();
      const queue = 'emailQueue';
      const message = JSON.stringify({
        to: user.email,
        subject: 'Registration Successful',
        text: `Welcome ${user.firstName}, you have successfully registered To Our Fundoo Notes Application.`,
      });

      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

      res
        .status(HttpStatus.CREATED)
        .json({ message: "User registered successfully", user });
    } catch (error: unknown) {
      console.error("Error during user registration:", error); // Add this line for logging
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const token = await userService.loginUser(req.body);
      res.status(HttpStatus.OK).json({ message: "Login successful", token });
    } catch (error: unknown) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user = await userService.findUserByEmail(req.body.email);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      const token = generateResetPasswordToken(
        { email: user.email },
        process.env.RESET_PASSWORD_SECRET!
      );
      await sendResetPasswordEmail(user.email, token);
      res
        .status(HttpStatus.OK)
        .json({ message: "Password reset token sent to email" });
    } catch (error: unknown) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const decoded = verifyResetPasswordToken(
        req.body.token,
        process.env.RESET_PASSWORD_SECRET!
      );
      if (typeof decoded !== "string" && "email" in decoded) {
        const { email } = decoded;
        await userService.updateUserPassword(email, req.body.newPassword);
        res
          .status(HttpStatus.OK)
          .json({ message: "Password reset successfully" });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid token" });
      }
    } catch (error: unknown) {
      console.error("Error during password reset:", error); // Add this line for logging
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };
}
