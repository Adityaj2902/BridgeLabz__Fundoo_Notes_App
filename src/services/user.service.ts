import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt.util";

export class UserService {
  // Register a new user
  public async registerUser(userData: unknown) {
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new Error("Email is already registered");
      }
      if (existingUser.username === userData.username) {
        throw new Error("Username is already taken");
      }
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await User.create(userData);
    return newUser;
  }

  // Login a user
  public async loginUser(userData: unknown) {
    const user = await User.findOne({ email: userData.email });

    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  }

  public async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  public async updateUserPassword(
    email: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findOne({ email });
    if (user) {
      user.password = await bcrypt.hash(newPassword, 10); // Ensure you hash the password before saving
      await user.save();
    }
  }
}
