export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Session',
        key: 'session_id',
      },
    },
    apparatus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Apparatus',
        key: 'apparatus_id',
      },
    },
  }, {
    tableName: 'Event',  // Explicitly set the table name here
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Session, {
      foreignKey: 'session_id',
    });
    Event.belongsTo(models.Apparatus, {
      foreignKey: 'apparatus_id',
    });
    Event.hasMany(models.Execution, {
      foreignKey: 'event_id',
    });
    Event.hasMany(models.Difficulty, {
      foreignKey: 'event_id',
    });
  };

  return Event;
};