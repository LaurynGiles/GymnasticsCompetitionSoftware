export default (sequelize, DataTypes) => {
  const Execution = sequelize.define('Execution', {
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
    execution_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
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