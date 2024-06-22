export default (sequelize, DataTypes) => {
  const Judge = sequelize.define('Judge', {
    judge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gsa_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    club: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'Judge',  // Explicitly set the table name here
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