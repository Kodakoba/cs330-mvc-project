import express from 'express';
import dashboardController from '../controllers/dashboard';

import {protectRoute} from "../auth.js"

export const dashboardRouter = express.Router();
dashboardRouter.get('/', dashboardController.dashboardView);