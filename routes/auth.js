import express from "express";
import authController from "../controllers/auth.js";
import dashboardController from "../controllers/dashboard.js";

export const authRouter = express.Router();
authRouter.get('/register', authController.registerView);
authRouter.get('/login', authController.loginView);
authRouter.get('/logout', authController.logoutUser);
authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
