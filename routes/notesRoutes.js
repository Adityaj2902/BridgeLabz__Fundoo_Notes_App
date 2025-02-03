const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const validateNote = require('../middlewares/validateNoteMiddleware'); 

// Define your routes
router.post('/notes', validateNote, noteController.createNote); 

router.get('/notes', noteController.getAllNotes); 

router.put('/notes/:id', validateNote, noteController.updateNote); 

router.delete('/notes/:id', noteController.deleteNote); 

module.exports = router;
