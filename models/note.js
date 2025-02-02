const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    notetitle: {
        type: String,
        required: true
    },
    notedata: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String
    },
    istrash: {
        type: Boolean,
        default: false  
    }
});


NoteSchema.index({ notetitle: 1 });

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
