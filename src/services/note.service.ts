/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import redisClient from '../config/redis';

import { Note } from '../models/note.model';

// create note
export const createNote = async (noteData: any, userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }
  noteData.userId = new Types.ObjectId(userId);
  noteData.isTrash = false;
  noteData.isArchive = false;
  const note= await Note.create(noteData);

   // Add note ID to user's note list in Redis
   const userNotesKey = `userNotes:${userId}`;
   await redisClient.lPush(userNotesKey, note._id.toString());
 
   // Invalidate the user's notes cache
   await redisClient.del(`notes:${userId}`);
 
   return note;
};

export const getNotesByUserId = async (userId: object) => {
  const cacheKey = `notes:${userId}`;
  const cachedNotes = await redisClient.get(cacheKey);

  if (cachedNotes) {
    return JSON.parse(cachedNotes);
  }

  const notes = await Note.find({ userId, isTrash: false });
  await redisClient.set(cacheKey, JSON.stringify(notes), {
    EX: 3600, // Cache expiration time in seconds (1 hour)
  });

  return notes;
};

// update a note
export const updateNoteById = async (noteId: string, updateData: any) => {
  const note = await Note.findByIdAndUpdate(noteId, updateData, { new: true });
  if (note) {
    await redisClient.del(`notes:${note.userId}`);
  }
  return note;
};

// delete note
export const deleteNoteById = async (noteId: string) => {
  const note = await Note.findByIdAndDelete(noteId);
  if (note) {
    // Remove note ID from user's note list in Redis
    const userNotesKey = `userNotes:${note.userId}`;
    await redisClient.lRem(userNotesKey, 0, noteId);

    // Invalidate the user's notes cache
    await redisClient.del(`notes:${note.userId}`);
  }
  return note;
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