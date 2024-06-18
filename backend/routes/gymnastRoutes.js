const express = require('express');
const router = express.Router();
const {
    getAllGymnasts,
    findGymnast,
    createGymnast,
    updateGymnast,
    deleteGymnast
} = require('../controllers/gymnastController');

router.get('/', getAllGymnasts);

router.get('/:id', findGymnast);

router.post('/', createGymnast);

router.put('/:id', updateGymnast);

router.delete('/:id', deleteGymnast);

module.exports = router;