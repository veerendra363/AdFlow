export default (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    filePath: { type: DataTypes.STRING, allowNull: false },
    fileType: { type: DataTypes.ENUM('image', 'video'), allowNull: false },
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Project, { foreignKey: 'projectId' });
  };

  return Asset;
};
