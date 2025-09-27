export default (sequelize, DataTypes) => {
  const Analytics = sequelize.define('Analytics', {
    eventType: { type: DataTypes.STRING, allowNull: false },
  }, {
    updatedAt: false,  // keep only createdAt
  });

  Analytics.associate = (models) => {
    Analytics.belongsTo(models.Project, { foreignKey: 'projectId' });
  };

  return Analytics;
};
