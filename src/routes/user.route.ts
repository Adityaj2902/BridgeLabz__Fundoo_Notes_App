/* eslint-disable max-len */
import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
// eslint-disable-next-line prettier/prettier
import { registerValidation, loginValidation } from '../validators/user.validator'; // Import validators

// import { userAuth } from '../middlewares/auth.middleware';

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
    this.router.post('/login', loginValidation, this.UserController.login);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
