const express = require('express');
const router = express.Router();
const getAllGymnasts = require('../controllers/gymnastController');

router.get('/gymnasts', getAllGymnasts);

// POST a new gymnast
// router.post('/', createGymnast);

// PUT update a gymnast
// router.put('/:id', updateGymnast);

// DELETE a gymnast
// router.delete('/:id', deleteGymnast);

module.exports = router;