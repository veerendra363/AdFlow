export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RenderJobs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'done', 'failed'),
        defaultValue: 'pending'
      },
      outputPath: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('RenderJobs');
  }
};
