import { Document } from 'mongoose';
import User from '../models/user'; // Assuming the user model is typed correctly

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserDocument> => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();
  return newUser;
};

export {
  registerUser,
};
