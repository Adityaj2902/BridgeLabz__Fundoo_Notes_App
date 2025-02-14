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
  const note = await Note.create(noteData);

  // Add note to Redis cache
  const noteKey = `note:${note._id}`;
  await redisClient.set(noteKey, JSON.stringify(note), { EX: 3600 });

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
    // Update note in Redis cache
    const noteKey = `note:${note._id}`;
    await redisClient.set(noteKey, JSON.stringify(note), { EX: 3600 });
  }
  return note;
};

export const searchNotesByTitle = async (userId: string, title: string) => {
  const notes = await Note.find({
    userId,
    title: { $regex: title, $options: 'i' }, // case-insensitive search
    isTrash: false,
  });
  return notes;
};

// delete note
export const deleteNoteById = async (noteId: string) => {
  const note = await Note.findByIdAndDelete(noteId);
  if (note) {
    // Remove note from Redis cache
    const noteKey = `note:${note._id}`;
    await redisClient.del(noteKey);
  }
  return note;
};

// move note to trash
export const moveToTrash = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isTrash: true }, { new: true });
  if (note) {
    // Update note in Redis cache
    const noteKey = `note:${note._id}`;
    await redisClient.set(noteKey, JSON.stringify(note), { EX: 3600 });
  }
  return note;
};

// archive note
export const archiveNote = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isArchive: true }, { new: true });
  if (note) {
    // Update note in Redis cache
    const noteKey = `note:${note._id}`;
    await redisClient.set(noteKey, JSON.stringify(note), { EX: 3600 });
  }
  return note;
};

// unarchive note
export const unarchiveNote = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isArchive: false }, { new: true });
  if (note) {
    // Update note in Redis cache
    const noteKey = `note:${note._id}`;
    await redisClient.set(noteKey, JSON.stringify(note), { EX: 3600 });
  }
  return note;
};