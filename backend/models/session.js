export default (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    indexes: [
      {
        unique: true,
        fields: ['session_id', 'time_slot_id']
      }
    ]
  });

  Session.associate = (models) => {
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