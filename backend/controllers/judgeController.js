const Judge = require('../models/judgeModel');

exports.createJudge = async (req, res) => {
  try {
    const { name, score } = req.body;
    const judge = await Judge.create({ name, score });
    res.status(201).json(judge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create judge' });
  }
};

exports.getJudges = async (req, res) => {
  try {
    const judges = await Judge.findAll();
    res.status(200).json(judges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch judges' });
  }
};