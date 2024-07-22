export default (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    competition_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Competition',
        key: 'competition_id',
      },
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    time_slot_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TimeSlot',
        key: 'time_slot_id',
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'Session',
  });

  Session.associate = (models) => {
    Session.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
    });
    Session.belongsTo(models.TimeSlot, {
      foreignKey: 'time_slot_id',
    });
    Session.hasMany(models.GymnastGroup, {
      foreignKey: 'session_id',
    });
    Session.hasMany(models.Event, {
      foreignKey: 'session_id',
    });
  };

  return Session;
};