import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './models/index.js';
import { findJudgeByGsaId } from './service/judgeService.js';
const { Judge } = db;

passport.use(new LocalStrategy({
    usernameField: 'gsa_id',
    passwordField: 'gsa_id',
},
async (gsa_id, _ , done) => {
    try {
        console.log(gsa_id);
        const judge = await findJudgeByGsaId(gsa_id);
        console.log(judge);
        if (!judge) {
            return done(null, false, { message: 'Invalid GSA number' });
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