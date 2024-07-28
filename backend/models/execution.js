export default (sequelize, DataTypes) => {
  const Execution = sequelize.define('Execution', {
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
    execution_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: 'Execution',
  });

  Execution.associate = (models) => {
    Execution.belongsTo(models.Event, {
      foreignKey: 'event_id',
    });
    Execution.belongsTo(models.Gymnast, {
      foreignKey: 'gymnast_id',
    });
    Execution.belongsTo(models.Judge, {
      foreignKey: 'judge_id',
    });
  };

  return Execution;
};