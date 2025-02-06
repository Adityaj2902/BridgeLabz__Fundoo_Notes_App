/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import NoteController from '../controllers/note.controller';
import { createNoteValidation, updateNoteValidation } from '../validators/note.validator';
import { authenticate } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */
class NoteRoutes {
    private NoteController = new NoteController();
    private router = express.Router();
    // NoteController: any;

    constructor() {
        this.routes();
    }

    private routes = () => {
        this.router.post('/', createNoteValidation, authenticate, this.NoteController.create);
        this.router.get('/', authenticate, this.NoteController.getAllByUser); // Add this line
        this.router.put('/:id', updateNoteValidation, authenticate, this.NoteController.updateById);
        this.router.delete('/:id', authenticate, this.NoteController.deleteById);
    };

    public getRoutes = (): IRouter => {
        return this.router;
    };
}

export default NoteRoutes;

