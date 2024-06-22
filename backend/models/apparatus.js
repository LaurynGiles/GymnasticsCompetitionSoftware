export default (sequelize, DataTypes) => {
  const Apparatus = sequelize.define('Apparatus', {
    apparatus_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    apparatus_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'Apparatus',  // Explicitly set the table name here
  });

  Apparatus.associate = (models) => {
    Apparatus.hasMany(models.Event, {
      foreignKey: 'apparatus_id',
    });
  };

  return Apparatus;
};