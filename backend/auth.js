import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './models/index.js';
import { findJudgeByGsaId } from './service/judgeService.js';
const { Judge } = db;

passport.use('judge-local', new LocalStrategy({
    usernameField: 'gsa_id',
    passwordField: 'gsa_id',
},
async (gsa_id, _ , done) => {
    try {
        const judge = await findJudgeByGsaId(gsa_id);
        if (!judge) {
            return done(null, false, { message: 'Unregistered GSA number' });
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