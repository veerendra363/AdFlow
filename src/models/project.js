export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, { foreignKey: 'userId' });
    Project.hasMany(models.Asset, { foreignKey: 'projectId', onDelete: 'CASCADE' });
    Project.hasMany(models.RenderJob, { foreignKey: 'projectId', onDelete: 'CASCADE' });
    Project.hasMany(models.Analytics, { foreignKey: 'projectId', onDelete: 'CASCADE' });
  };

  return Project;
};
