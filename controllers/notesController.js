const noteService = require('../services/noteServices');

// Create a new note
async function createNote(req, res) {
    try {
        const noteData = req.body;
        const note = await noteService.createNote(noteData);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all notes
async function getAllNotes(req, res) {
    try {
        const notes = await noteService.getAllNotes();
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a note
async function updateNote(req, res) {
    try {
        const id = req.params.id;
        const noteData = req.body;
        const updatedNote = await noteService.updateNote(id, noteData);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Soft delete a note (non-functional for now)
async function deleteNote(req, res) {
    try {
        const id = req.params.id;
        const deletedNote = await noteService.deleteNote(id);
        res.status(200).json({ message: 'Note marked as deleted (non-functional)', note: deletedNote });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
};
