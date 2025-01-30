import mongoose, { Document, Schema } from 'mongoose';

// Define an interface that extends Mongoose's Document interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Optional: Add timestamps (createdAt, updatedAt)

// Create and export the User model with the IUser interface
const User = mongoose.model<IUser>('User', userSchema);

export default User;
