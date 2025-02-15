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

  // Add the note to Redis cache using a hash (where key is userId and field is noteId)
  const cacheKey = `notes:${userId}`;
  const cachedNotes = await redisClient.hGetAll(cacheKey);

  if (Object.keys(cachedNotes).length > 0) {
    const noteKey = `notes:${userId}`;
    await redisClient.hSet(noteKey, note._id.toString(), JSON.stringify(note));
  }
  return note;
};

// get notes by userId
export const getNotesByUserId = async (userId: string) => {
  const cacheKey = `notes:${userId}`;
  const cachedNotes = await redisClient.hGetAll(cacheKey);

  if (Object.keys(cachedNotes).length > 0) {
    return Object.values(cachedNotes).map((note: string) => JSON.parse(note));
  }

  // If notes are not found in cache, fetch from the database and update cache
  const notes = await Note.find({ userId: new Types.ObjectId(userId) as any });
  notes.forEach(async (note) => {
    await redisClient.hSet(cacheKey, note._id.toString(), JSON.stringify(note));
  });
  // await redisClient.expire(cacheKey, 3600);

  return notes;
};

// update a note
export const updateNoteById = async (noteId: string, updateData: any) => {
  const note = await Note.findByIdAndUpdate(noteId, updateData, { new: true });
  if (note) {
    // Update the note in Redis cache using the hash
    const noteKey = `notes:${note.userId}`;
    await redisClient.hSet(noteKey, note._id.toString(), JSON.stringify(note));
    await redisClient.expire(noteKey, 3600);
  }
  return note;
};

// search notes by title
export const searchNotesByTitle = async (userId: string, title: string) => {
  const notes = await Note.find({
    userId: new Types.ObjectId(userId) as any,
    title: { $regex: title, $options: 'i' }, // case-insensitive search
    isTrash: false,
  });
  return notes;
};

// delete note
export const deleteNoteById = async (noteId: string) => {
  const note = await Note.findByIdAndDelete(noteId);
  if (note) {
    // Remove the note from Redis cache using the hash
    const noteKey = `notes:${note.userId}`;
    await redisClient.hDel(noteKey, note._id.toString());
  }
  return note;
};

// move note to trash
export const moveToTrash = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isTrash: true }, { new: true });
  if (note) {
    // Update the note in Redis cache
    const noteKey = `notes:${note.userId}`;
    await redisClient.hSet(noteKey, note._id.toString(), JSON.stringify(note));
    await redisClient.expire(noteKey, 3600);
  }
  return note;
};

// archive note
export const archiveNote = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isArchive: true }, { new: true });
  if (note) {
    // Update the note in Redis cache
    const noteKey = `notes:${note.userId}`;
    await redisClient.hSet(noteKey, note._id.toString(), JSON.stringify(note));
    await redisClient.expire(noteKey, 3600);
  }
  return note;
};

// unarchive note
export const unarchiveNote = async (noteId: string) => {
  const note = await Note.findByIdAndUpdate(noteId, { isArchive: false }, { new: true });
  if (note) {
    // Update the note in Redis cache
    const noteKey = `notes:${note.userId}`;
    await redisClient.hSet(noteKey, note._id.toString(), JSON.stringify(note));
    await redisClient.expire(noteKey, 3600);
  }
  return note;
};