import passport from 'passport';

export const login = (req, res, next) => {
    console.log("beginning");
    passport.authenticate('local', (err, judge, info) => {
        console.log("AUTHENTICATING");
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!judge) {
            console.log("here");
            return res.status(400).json({ message: info.message });
        }
        console.log("Returning");
        console.log(judge.judge_id);
        console.log(judge.role);
        res.status(200).json({ judge_id: judge.judge_id, role: judge.role, head_judge: judge.head_judge });
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