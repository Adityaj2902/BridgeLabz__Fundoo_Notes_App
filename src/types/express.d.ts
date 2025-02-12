// src/types/express.d.ts
import * as express from "express";

// Extend the Express Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string; // or whatever the user object structure is
        // Add other properties you might need here (e.g. email, name)
      };
    }
  }
}
