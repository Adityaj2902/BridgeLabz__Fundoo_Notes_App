// filepath: /Volumes/MacOs Disk 1/Fundoo_Notes_App/src/utils/mailer.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = (to: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset",
    text: `You requested a password reset. Please use the following token to reset your password: ${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.info("Email sent:", info.response);
    }
  });
};

export const sendCollaboratorEmail = (to: string, noteTitle: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "You have been added as a collaborator",
    text: `You have been added as a collaborator to the note: ${noteTitle}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.info("Email sent:", info.response);
    }
  });
};