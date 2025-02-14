import express, { IRouter } from "express";

import userRoute from "./user.route";
import NoteRoutes from "./note.route";
import CollaboratorRoutes from "./collaborator.route";

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get("/", (req, res) => {
    res.json("Welcome To My Website of Fundoo Notes");
  });
  router.use("/users", new userRoute().getRoutes());
  router.use("/notes", new NoteRoutes().getRoutes()); // Add note routes
  router.use("/collaborators", new CollaboratorRoutes().getRoutes()); // Add collaborator routes


  return router;
};

export default routes;
