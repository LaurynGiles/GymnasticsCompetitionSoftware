export default (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    competition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Admin',
        key: 'admin_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
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
    bronze_min_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    bronze_max_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    silver_min_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    silver_max_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    gold_min_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    gold_max_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  }, {
    tableName: 'Competition',
  });

  Competition.associate = (models) => {
    Competition.hasMany(models.TimeSlot, {
      foreignKey: 'competition_id',
    });
    Competition.belongsTo(models.Admin, {
      foreignKey: 'admin_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    Competition.hasMany(models.Qualification, {
      foreignKey: 'competition_id',
    });
  };

  return Competition;
};