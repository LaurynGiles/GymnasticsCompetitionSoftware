export default (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Event',
        key: 'event_id',
      },
      onDelete: 'CASCADE', // Automatically delete scores if the associated Event is deleted
      onUpdate: 'CASCADE',
    },
    gymnast_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Gymnast',
        key: 'gymnast_id',
      },
      onDelete: 'CASCADE', // Automatically delete scores if the associated Gymnast is deleted
      onUpdate: 'CASCADE',
    },
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Judge',
        key: 'judge_id',
      },
      onDelete: 'SET NULL', // Set judge_id to NULL if the associated Judge is deleted
      onUpdate: 'CASCADE',
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Difficulty.belongsTo(models.Gymnast, {
      foreignKey: 'gymnast_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Difficulty.belongsTo(models.Judge, {
      foreignKey: 'judge_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Difficulty;
};