export default (sequelize, DataTypes) => {
  const RenderJob = sequelize.define('RenderJob', {
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'done', 'failed'),
      defaultValue: 'pending'
    },
    outputPath: { type: DataTypes.STRING },
  });

  RenderJob.associate = (models) => {
    RenderJob.belongsTo(models.Project, { foreignKey: 'projectId' });
  };

  return RenderJob;
};
