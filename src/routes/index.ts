import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import NoteRoutes from './note.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome To My Website of Fundoo Notes');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes', new NoteRoutes().getRoutes()); // Add note routes

  return router;
};

export default routes;
