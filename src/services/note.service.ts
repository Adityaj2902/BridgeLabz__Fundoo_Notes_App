/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { Note } from '../models/note.model';

// create note
export const createNote = async (noteData: any, userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }
  noteData.userId = new Types.ObjectId(userId);
  noteData.isTrash = false;
  noteData.isArchive = false;
  return await Note.create(noteData);
};

export const getNotesByUserId = async (userId: object) => {
  return await Note.find({ userId, isTrash: false });
};

// update a note
export const updateNoteById = async (noteId: string, updateData: any) => {
  return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
};

// delete note
export const deleteNoteById = async (noteId: string) => {
  return await Note.findByIdAndDelete(noteId);
};

// move note to trash
export const moveToTrash = async (noteId: string) => {
  return await Note.findByIdAndUpdate(noteId, { isTrash: true }, { new: true });
};

// archive note
export const archiveNote = async (noteId: string) => {
  return await Note.findByIdAndUpdate(noteId, { isArchive: true }, { new: true });
};

// unarchive note
export const unarchiveNote = async (noteId: string) => {
  return await Note.findByIdAndUpdate(noteId, { isArchive: false }, { new: true });
};