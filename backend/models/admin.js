export default (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(30),
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
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      tableName: 'Admin',
    });
  
    Admin.associate = (models) => {
      Admin.hasMany(models.Competition, {
        foreignKey: 'admin_id',
      });
    };
  
    return Admin;
  };