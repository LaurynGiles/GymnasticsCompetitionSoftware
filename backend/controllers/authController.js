import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('judge-local', (err, judge, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!judge) {
            return res.status(400).json({ message: info.message });
        }
        res.status(200).json({judge});
    })(req, res, next);
};