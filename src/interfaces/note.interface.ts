/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';

export interface INote extends Document {
    title: string;
    description: string;
    color: string;
    userId: ObjectId; // To associate the note with a user
}
