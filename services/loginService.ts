import User from '../models/user'; // Assuming your model is typed correctly
import { IUser } from '../models/user'; // Assuming you export the IUser interface

const loginUser = async (email: string, password: string): Promise<IUser> => {
  // Check if the user exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if password matches (plain text comparison)
  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return user;  // Returning the user object for further use
};

export {
  loginUser,
};
