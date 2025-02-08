/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Note } from '../models/note.model';
import { Types } from 'mongoose';

// create note
export const createNote = async (noteData: any, userId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
    }
    noteData.userId = new Types.ObjectId(userId);
    return await Note.create(noteData);
};

export const getNotesByUserId = async (userId: Object) => {
    return await Note.find({ userId });
};

// update a note
export const updateNoteById = async (noteId: string, updateData: any) => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
};

// delete note
export const deleteNoteById = async (noteId: string) => {
    return await Note.findByIdAndDelete(noteId);
};