import passport from 'passport';
import LocalStrategy from 'passport-local'
import bcrypt from 'bcryptjs'
import {prisma} from './server.js'

export function initPassport() {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = await prisma.user.findUnique({where: { email }});
            if(!user) return done(null, false);
            if(!bcrypt.compareSync(password, user.passwordHash)) return done(null, false);
            return done(null, user);
        })
    );

    passport.serializeUser((user, done) => {;
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        const user = await prisma.user.findUnique({where: { id }});
        done(null, user);
    });
}

export function protectRoute(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login?next=' + req.url);
}