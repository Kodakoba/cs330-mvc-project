import express from 'express';
import dashboardController from '../controllers/dashboard.js';

import {protectRoute} from "../auth.js"
import req from "express/lib/request.js";

export const dashboardRouter = express.Router();
dashboardRouter.get('/', dashboardController.dashboardView);
