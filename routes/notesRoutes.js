const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const validateNote = require('../middlewares/validateNoteMiddleware'); // Import the middleware

// Define your routes
router.post('/notes', validateNote, noteController.createNote); // Create a new note
router.get('/notes', noteController.getAllNotes); // Get all notes
router.put('/notes/:id', validateNote, noteController.updateNote); // Update an existing note
router.delete('/notes/:id', noteController.deleteNote); // Soft delete a note (non-functional)

module.exports = router;
