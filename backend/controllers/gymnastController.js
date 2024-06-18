const Gymnast = require('../models/gymnast')

async function getAllGymnasts(req, res, next) {
    try {
        const gymnasts = await Gymnast.findAll();
        res.status(200).json(gymnasts);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllGymnasts,
};