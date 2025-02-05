import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

// Define User Schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // eslint-disable-next-line max-len
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the User model
export const User = model<IUser>('User', userSchema);
