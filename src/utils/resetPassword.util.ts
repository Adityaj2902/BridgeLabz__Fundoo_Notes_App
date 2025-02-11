import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const { RESET_PASSWORD_SECRET } = process.env;

export const generateResetPasswordToken = (
  payload: object,
  RESET_PASSWORD_SECRET: string
) => {
  return jwt.sign(payload, RESET_PASSWORD_SECRET, { expiresIn: "1h" });
};

export const verifyResetPasswordToken = (
  token: string,
  RESET_PASSWORD_SECRET: string
) => {
  return jwt.verify(token, RESET_PASSWORD_SECRET);
};
