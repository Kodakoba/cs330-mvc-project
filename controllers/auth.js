import passport from "passport";
import bcrypt from "bcryptjs";
import { prisma } from "../server.js";

export default {
    registerView: (req, res) => {
        res.render('register');
    },

    loginView: (req, res) => {
        res.render('login');
    },

    registerUser: async (req, res) => {
        console.log(req.body);
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.render('register', { error: 'Please fill all fields' });
        }
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(user);
        if(user) {
            return res.render('register', { error: 'A user account already exists with this email' });
        }
        
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                passwordHash: bcrypt.hashSync(password, 8)
            },
        })



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