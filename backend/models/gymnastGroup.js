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
    },
  }, {
    tableName: 'GymnastGroup',  // Explicitly set the table name here
  });

  GymnastGroup.associate = (models) => {
    GymnastGroup.hasMany(models.Gymnast, {
      foreignKey: 'group_id',
    });
    GymnastGroup.belongsTo(models.Session, {
      foreignKey: 'session_id',
    });
  };

  return GymnastGroup;
};