const express = require('express');
const router = express.Router();
const judgeController = require('../controllers/judgeController');

router.post('/judges', judgeController.createJudge);
router.get('/judges', judgeController.getJudges);

module.exports = router;