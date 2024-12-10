//welcome to the MVC server script :)
import express from "express";
import session from "express-session";
import passport from "passport";
import {authRouter} from "./routes/auth.js"
import {dashboardRouter} from "./routes/dashboard.js"
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

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));

app.post('/users', async (req, res) => {
    const { email, name } = req.body;
    const user = await prisma.user.create({
        data: { email, name },
    });
    res.json(user);
});


app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/', dashboardRouter);

app.get("*", function (req, res) {
    res.render("views/error.pug");
});

const server = http.createServer(app);

server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Endpoint server listening on ' + bind);
});

server.listen(process.env.SERVER_PORT);
