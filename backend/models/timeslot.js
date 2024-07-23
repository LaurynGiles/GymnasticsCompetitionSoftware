export default (sequelize, DataTypes) => {
  const TimeSlot = sequelize.define('TimeSlot', {
    time_slot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    competition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Competition',
        key: 'competition_id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    report_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    competition_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    award_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'TimeSlot',
  });

  TimeSlot.associate = (models) => {
    TimeSlot.hasMany(models.Session, {
      foreignKey: 'time_slot_id',
    });
    TimeSlot.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
    });
  };

  return TimeSlot;
};