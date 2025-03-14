/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import NoteController from '../controllers/note.controller';
import { createNoteValidation, updateNoteValidation } from '../validators/note.validator';
import { authenticate } from '../middlewares/auth.middleware';

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
    this.router.get('/search', authenticate, this.NoteController.searchByTitle); // Search notes by title
    this.router.put('/:id/trash', authenticate, this.NoteController.moveToTrash);
    this.router.put('/:id/untrash', authenticate, this.NoteController.unMoveToTrash);
    this.router.put('/:id/archive', authenticate, this.NoteController.archiveNote);
    this.router.put('/:id/unarchive', authenticate, this.NoteController.unarchiveNote);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;

