// src/controllers/collaborator.controller.ts
import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { addCollaborator, removeCollaborator } from "../services/collaborator.service";

export default class CollaboratorController {
  public addCollaborator = async (req: Request, res: Response): Promise<void> => {
    try {
      const note = await addCollaborator(req.params.noteId, req.body.userId);
      res.status(HttpStatus.OK).json({ message: "Collaborator added successfully", note });
    } catch (error: unknown) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };

  public removeCollaborator = async (req: Request, res: Response): Promise<void> => {
    try {
      const note = await removeCollaborator(req.params.noteId, req.body.userId);
      res.status(HttpStatus.OK).json({ message: "Collaborator removed successfully", note });
    } catch (error: unknown) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
}