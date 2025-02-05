/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { Schema, model} from 'mongoose';
import { INote } from '../interfaces/note.interface';

const noteSchema = new Schema<INote>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, default: '#FFFFFF' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } // user id to create a link between note and user
});

export const Note = model<INote>('Note', noteSchema);