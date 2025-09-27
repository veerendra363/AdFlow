export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
  });

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Project, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};