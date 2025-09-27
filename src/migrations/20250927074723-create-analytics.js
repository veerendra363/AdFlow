export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Analytics', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE'
      },
      eventType: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Analytics');
  }
};
