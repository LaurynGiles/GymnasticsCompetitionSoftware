export default (sequelize, DataTypes) => {
  const GymnastGroup = sequelize.define('GymnastGroup', {
    group_id: {
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
      onDelete: 'CASCADE',  // Automatically delete GymnastGroup when Session is deleted
      onUpdate: 'CASCADE',
    },
  }, {
    tableName: 'GymnastGroup',
  });

  GymnastGroup.associate = (models) => {
    GymnastGroup.hasMany(models.Gymnast, {
      foreignKey: 'group_id',
      onDelete: 'CASCADE', // Delete all associated gymnasts when the group is deleted
      onUpdate: 'CASCADE',
    });
    GymnastGroup.hasMany(models.Event, {
      foreignKey: 'group_id',
      onDelete: 'CASCADE', // Delete all associated events when the group is deleted
      onUpdate: 'CASCADE',
    });
    GymnastGroup.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE', // Delete group when session is deleted
      onUpdate: 'CASCADE',
    });
  };

  return GymnastGroup;
};