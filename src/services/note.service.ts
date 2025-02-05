/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Note } from '../models/note.model';

// create note
export const createNote = async (noteData: any, userId: string) => {
    noteData.userId = userId;
    return await Note.create(noteData);
};

export const getNotesByUserId = async (userId: string) => {
    return await Note.find({ userId });
};

// update a node
export const updateNoteById = async (noteId: string, updateData: any) => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
};

// delete note
export const deleteNoteById = async (noteId: string) => {
    return await Note.findByIdAndDelete(noteId);
};