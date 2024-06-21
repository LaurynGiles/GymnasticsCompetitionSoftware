export default (sequelize, DataTypes) => {
  const TimeSlot = sequelize.define('TimeSlot', {
    time_slot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  }, {
    tableName: 'TimeSlot',
  });

  TimeSlot.associate = (models) => {
    TimeSlot.hasMany(models.Session, {
      foreignKey: 'time_slot_id',
    });
  };

  return TimeSlot;
};