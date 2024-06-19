export default (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    gymnast_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    difficulty_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    penalty_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    start_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });

  Difficulty.associate = (models) => {
    Difficulty.belongsTo(models.Event, {
      foreignKey: 'event_id',
    });
    Difficulty.belongsTo(models.Gymnast, {
      foreignKey: 'gymnast_id',
    });
    Difficulty.belongsTo(models.Judge, {
      foreignKey: 'judge_id',
    });
  };

  return Difficulty;
};