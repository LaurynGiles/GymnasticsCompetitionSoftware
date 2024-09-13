import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './models/index.js';

const { Admin } = db;

// Admin LocalStrategy
passport.use('admin-local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        console.log("HERE");
        const admin = await Admin.findOne({ where: { username } });
        console.log(`Admin info: ${admin}`);

        if (!admin) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        // You should compare the password in real scenarios (hashed passwords)
        if (admin.password !== password) { // This should be replaced with a hashed password check
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, admin);
    } catch (err) {
        console.log(err);
        return done(err);
    }
}));

passport.serializeUser((admin, done) => {
    done(null, admin.admin_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findByPk(id);
        done(null, admin);
    } catch (err) {
        done(err);
    }
});

export default passport;