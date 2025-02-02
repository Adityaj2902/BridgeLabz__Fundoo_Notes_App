const Note = require('../models/Note');

// Create a new note
async function createNote(noteData) {
    try {
        const newNote = new Note({
            notetitle: noteData.notetitle,
            notedata: noteData.notedata,
            backgroundColor: noteData.backgroundColor,
            // istrash defaults to false and is non-functional for now
        });
        return await newNote.save();
    } catch (error) {
        throw new Error('Error creating note: ' + error.message);
    }
}

// Get all notes
async function getAllNotes() {
    try {
        return await Note.find().lean();
    } catch (error) {
        throw new Error('Error retrieving notes: ' + error.message);
    }
}

// Update a note by ID
async function updateNote(id, noteData) {
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, noteData, { new: true });
        if (!updatedNote) {
            throw new Error('Note not found');
        }
        return updatedNote;
    } catch (error) {
        throw new Error('Error updating note: ' + error.message);
    }
}

// Soft delete a note (non-functional for now, just a placeholder)
async function deleteNote(id) {
    try {
        const note = await Note.findById(id);
        if (!note) {
            throw new Error('Note not found');
        }
        // Just returning the note as it is, since trash is non-functional
        return note;
    } catch (error) {
        throw new Error('Error deleting note: ' + error.message);
    }
}

module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
};
