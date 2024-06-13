const Judge = require('../models/judgeModel');

const getJudges = async (req, res) => {
    try {
      const judges = await Judge.find();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getJudges,
    createJudge,
    getJudgeById,
    updateJudge,
    deleteJudge
  };