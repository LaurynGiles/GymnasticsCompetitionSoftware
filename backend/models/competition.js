module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    competition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    competition_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
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