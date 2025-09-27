export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE'
      },
      filePath: { type: Sequelize.STRING, allowNull: false },
      fileType: { type: Sequelize.ENUM('image', 'video'), allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Assets');
  }
};
