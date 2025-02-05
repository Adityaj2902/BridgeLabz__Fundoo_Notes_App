/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { User } from '../models/user.model'; // Assuming you have a `User` model
// eslint-disable-next-line max-len
import { generateToken } from '../utils/user.util'; // Assuming this function generates JWT tokens

// Register a new user
export const registerUser = async (userData: any) => {
  // Check if user already exists with the same email or username
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }]
  });

  if (existingUser) {
    // If user exists, check if the email or username already exists
    if (existingUser.email === userData.email) {
      throw new Error('Email is already registered');
    }
    if (existingUser.username === userData.username) {
      throw new Error('Username is already taken');
    }
   }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  // Create the new user in the database
  const newUser = await User.create(userData);
  return newUser;
};

// Login a user
export const loginUser = async (userData: any) => {
  // Find the user by email
  const user = await User.findOne({ email: userData.email });

  // If the user is not found or password is incorrect
  if (!user || !(await bcrypt.compare(userData.password, user.password))) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token for the user
  const token = generateToken({ id: user._id, email: user.email });

  // eslint-disable-next-line max-len
  // Return the token and user details (you can decide what information to return)
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username
    }
  };
};
