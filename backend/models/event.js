export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'GymnastGroup',
        key: 'group_id',
      }
    },
    apparatus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Apparatus',
        key: 'apparatus_id',
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'Event',
    indexes: [
      {
        unique: true,
        fields: ['group_id', 'apparatus_id'],
      }
    ]
  });

  Event.associate = (models) => {

    Event.belongsTo(models.Apparatus, {
      foreignKey: 'apparatus_id',
      as: 'Apparatus',
    });
    Event.belongsTo(models.GymnastGroup, {
      foreignKey: 'group_id',
      as: 'GymnastGroup',
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