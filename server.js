//welcome to the MVC server script :)
import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.js"
import dashboardRoutes from "./routes/dashboard.js"
import { initPassport } from "./auth.js";
import { PrismaClient } from '@prisma/client';
import logger from 'morgan';
import http from 'http';

export const prisma = new PrismaClient();

const app = express();

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');
app.set('port', process.env.SERVER_PORT);

app.use(logger('combined'));

initPassport();

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

const server = http.createServer(app);

server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Endpoint server listening on ' + bind);
});

server.listen(process.env.SERVER_PORT);
