// src/routes/collaborator.route.ts
import express, { IRouter } from 'express';
import CollaboratorController from '../controllers/collaborator.controller';
import { authenticate } from '../middlewares/auth.middleware';

class CollaboratorRoutes {
  private CollaboratorController = new CollaboratorController();

  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/:noteId/add', authenticate, this.CollaboratorController.addCollaborator);
    this.router.post('/:noteId/remove', authenticate, this.CollaboratorController.removeCollaborator);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CollaboratorRoutes;