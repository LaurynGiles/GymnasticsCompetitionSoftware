import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('local', (err, judge, info) => {
        if (err) {
            return next(err);
        }
        if (!judge) {
            return res.status(400).json({ message: info.message });
        }
        const judgeInfo = {
            judge_id: judge.judge_id,
            role: judge.role,
            head_judge: judge.head_judge,
        };
        res.cookie('judgeInfo', JSON.stringify(judgeInfo), { httpOnly: true, secure: true, signed: true });
        res.json({ message: 'Login successful' });
    })(req, res, next);
};