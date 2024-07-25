import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('local', (err, judge, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!judge) {
            return res.status(400).json({ message: info.message });
        }
        res.status(200).json({ judge_id: judge.judge_id, role: judge.role, head_judge: judge.head_judge, judge_fname: judge.first_name, judge_lname: judge.last_name });
    })(req, res, next);
};

// export const login = (req, res, next) => {
//     passport.authenticate('local', (err, judge, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!judge) {
//             return res.status(400).json({ message: info.message });
//         }
//         const judgeInfo = {
//             judge_id: judge.judge_id,
//             role: judge.role,
//             head_judge: judge.head_judge,
//         };
//         res.cookie('judgeInfo', JSON.stringify(judgeInfo), { httpOnly: true, secure: true, signed: true });
//         res.json({ message: 'Login successful' });
//     })(req, res, next);
// };