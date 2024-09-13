import passport from 'passport';

export const loginAdmin = (req, res, next) => {
    console.log(`REQUEST: ${req.username}, ${req.password}}`);

    passport.authenticate('admin-local', (err, admin, info) => {

        console.log(`ADMIN: ${admin}`);

        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!admin) {
            return res.status(400).json({ message: info.message });
        }
        res.status(200).json({
            admin_id: admin.admin_id,
            username: admin.username,
            first_name: admin.first_name,
            last_name: admin.last_name,
            contact_number: admin.contact_number,
            email: admin.email
        });
    })(req, res, next);
};