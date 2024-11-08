export default (sequelize, DataTypes) => {
  const Execution = sequelize.define('Execution', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Event',
        key: 'event_id',
      },
      onDelete: 'CASCADE', // Delete execution scores when the related event is deleted
      onUpdate: 'CASCADE',
    },
    gymnast_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Gymnast',
        key: 'gymnast_id',
      },
      onDelete: 'CASCADE', // Delete execution scores when the related gymnast is deleted
      onUpdate: 'CASCADE',
    },
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Judge',
        key: 'judge_id',
      },
      onDelete: 'SET NULL', // Set judge_id to NULL if the related judge is deleted
      onUpdate: 'CASCADE',
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Execution.belongsTo(models.Gymnast, {
      foreignKey: 'gymnast_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Execution.belongsTo(models.Judge, {
      foreignKey: 'judge_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Execution;
};