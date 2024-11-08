export default (sequelize, DataTypes) => {
  const Judge = sequelize.define('Judge', {
    judge_id: {
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
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    head_judge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
    Judge.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Judge;
};