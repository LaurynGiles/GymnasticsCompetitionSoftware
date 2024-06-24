import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './models/index.js';

const Judge = db.Judge;

passport.use(new LocalStrategy({
    usernameField: 'gsa_id',
    passwordField: 'gsa_id',
    session: false, // Assuming you're not maintaining sessions
},
async (gsa_id, _, done) => {
    try {
        const judge = await Judge.findOne({ where: { gsa_id } });
        if (!judge) {
            return done(null, false, { message: 'Incorrect GSA ID.' });
        }
        return done(null, judge);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((judge, done) => {
    done(null, judge.judge_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const judge = await Judge.findByPk(id);
        done(null, judge);
    } catch (err) {
        done(err);
    }
});

export default passport;