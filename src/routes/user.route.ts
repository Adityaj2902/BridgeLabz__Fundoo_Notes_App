import express, { IRouter } from "express";
import userController from "../controllers/user.controller";
import {
  registerValidation,
  loginValidation,
} from "../validators/user.validator"; // Import validators

class UserRoutes {
  private UserController = new userController();

  private router = express.Router();
  // private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // eslint-disable-next-line max-len, prettier/prettier
    this.router.post('/register',registerValidation,this.UserController.register);
    this.router.post("/login", loginValidation, this.UserController.login);
    this.router.post("/forgot-password", this.UserController.forgotPassword);
    this.router.post("/reset-password", this.UserController.resetPassword);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
