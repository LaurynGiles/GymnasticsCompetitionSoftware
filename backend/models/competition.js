module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    competition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    competition_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  Competition.associate = (models) => {
    Competition.hasMany(models.Session, {
      foreignKey: 'competition_id',
    });
  };

  return Competition;
};