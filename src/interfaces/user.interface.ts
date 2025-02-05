import { Document } from 'mongoose';

export interface IUser extends Document {
  // eslint-disable-next-line max-len
  _id: string | number; // This is the type for the unique identifier of the user (Mongoose automatically assigns an `_id` field)
  firstName: string;
  username: string;
  lastName: string;
  email: string;
  password: string;
}
