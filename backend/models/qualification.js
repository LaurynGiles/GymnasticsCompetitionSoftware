// models/Qualification.js
export default (sequelize, DataTypes) => {
    const Qualification = sequelize.define('Qualification', {
      qualification_id: {
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
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      min_score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      tableName: 'Qualification',
    });
  
    Qualification.associate = (models) => {
      Qualification.belongsTo(models.Competition, {
        foreignKey: 'competition_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    };
  
    return Qualification;
  };
  