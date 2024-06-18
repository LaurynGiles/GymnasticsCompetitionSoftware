module.exports = (sequelize, DataTypes) => {
  const Judge = sequelize.define('Judge', {
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gsa_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    club: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Judge.associate = (models) => {
    Judge.hasMany(models.Execution, {
      foreignKey: 'judge_id',
    });
    Judge.hasMany(models.Difficulty, {
      foreignKey: 'judge_id',
    });
  };

  return Judge;
};