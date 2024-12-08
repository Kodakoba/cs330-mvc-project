import passport from "passport";
import bcrypt from "bcryptjs";
const passport = require('passport');
const bcrypt = require('bcryptjs');
import { prisma } from "../server.js";

module.exports = {
    registerView: (req, res) => {
        res.render('register');
    },

    loginView: (req, res) => {
        res.render('login');
    },

    registerUser: async (req, res) => {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.render('register', { error: 'Please fill all fields' });
        }
        
        const user = prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(user) {
            return res.render('register', { error: 'A user account already exists with this email' });
        }
        
        const newUser = prisma.user.create({
            email: email,
            name: name
        })
        await User.create({name, email, password: bcrypt.hashSync(password, 8)});

        res.redirect('login?registrationdone');
    },

    loginUser: (req, res) => {
        passport.authenticate('local', {
            successRedirect: '/?loginsuccess',
            failureRedirect: '/login?error'
        })(req, res);
    },

    logoutUser: (req, res) => {
        req.logout(() => res.redirect('/login?loggedout'));
    }
}