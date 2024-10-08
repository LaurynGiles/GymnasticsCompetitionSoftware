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
  }, {
    tableName: 'Apparatus',
  });

  Apparatus.associate = (models) => {
    Apparatus.hasMany(models.Event, {
      foreignKey: 'apparatus_id',
    });
    Apparatus.belongsTo(models.Competition, {
      foreignKey: 'competition_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Apparatus;
};