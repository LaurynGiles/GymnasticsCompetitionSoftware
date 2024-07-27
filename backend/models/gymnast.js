export default (sequelize, DataTypes) => {
  const Gymnast = sequelize.define('Gymnast', {
    gymnast_id: {
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
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    club: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ethnicity: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GymnastGroup',
        key: 'group_id',
      },
    },
  }, {
    tableName: 'Gymnast',  // Explicitly set the table name here
  });

  Gymnast.associate = (models) => {
    Gymnast.belongsTo(models.GymnastGroup, {
      foreignKey: 'group_id',
    });
    Gymnast.hasMany(models.Execution, {
      foreignKey: 'gymnast_id',
    });
    Gymnast.hasMany(models.Difficulty, {
      foreignKey: 'gymnast_id',
    });
  };

  return Gymnast;
};