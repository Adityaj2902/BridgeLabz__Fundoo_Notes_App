import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },

});

const User = mongoose.model("User", UserSchema);

export default User;
