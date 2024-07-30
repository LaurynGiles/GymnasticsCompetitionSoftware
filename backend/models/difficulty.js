export default (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Event',
        key: 'event_id',
      },
    },
    gymnast_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Gymnast',
        key: 'gymnast_id',
      },
    },
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Judge',
        key: 'judge_id',
      },
    },
    difficulty_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    penalty_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: 'Difficulty',
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