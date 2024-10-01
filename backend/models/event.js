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
      },
      onDelete: 'CASCADE', // Automatically delete events if the associated GymnastGroup is deleted
      onUpdate: 'CASCADE',
    },
    apparatus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Apparatus',
        key: 'apparatus_id',
      },
      onDelete: 'SET NULL', // Set apparatus_id to NULL if the associated Apparatus is deleted
      onUpdate: 'CASCADE',
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
    ],
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Apparatus, {
      foreignKey: 'apparatus_id',
      as: 'Apparatus',
      onDelete: 'SET NULL', // Update association to match model constraint
      onUpdate: 'CASCADE',
    });
    Event.belongsTo(models.GymnastGroup, {
      foreignKey: 'group_id',
      as: 'GymnastGroup',
      onDelete: 'CASCADE', // Update association to match model constraint
      onUpdate: 'CASCADE',
    });
    Event.hasMany(models.Execution, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Event.hasMany(models.Difficulty, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Event;
};