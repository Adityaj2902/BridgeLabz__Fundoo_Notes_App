/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { createNote, updateNoteById, deleteNoteById, getNotesByUserId, moveToTrash, archiveNote, unarchiveNote } from '../services/note.service';
import HttpStatus from 'http-status-codes';

export default class NoteController {
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await createNote(req.body, (req as any).user.id);
            res.status(HttpStatus.CREATED).json({ message: 'Note created successfully', note });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public getAllByUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const notes = await getNotesByUserId((req as any).user.id);
            res.status(HttpStatus.OK).json({ notes });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public updateById = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await updateNoteById(req.params.id, req.body);
            if (!note) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Note not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Note updated successfully', note });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public deleteById = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await deleteNoteById(req.params.id);
            if (!note) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Note not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Note deleted successfully' });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public moveToTrash = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await moveToTrash(req.params.id);
            if (!note) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Note not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Note moved to trash', note });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public archiveNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await archiveNote(req.params.id);
            if (!note) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Note not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Note archived', note });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };

    public unarchiveNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const note = await unarchiveNote(req.params.id);
            if (!note) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Note not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Note unarchived', note });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    };
}