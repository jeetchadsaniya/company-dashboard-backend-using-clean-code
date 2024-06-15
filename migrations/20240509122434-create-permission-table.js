'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE permission (
      permissionId INT AUTO_INCREMENT PRIMARY KEY,
      \`read\` BOOLEAN NOT NULL,
      \`write\` BOOLEAN NOT NULL,
      \`delete\` BOOLEAN NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
  `;

    await queryInterface.sequelize.query(createTableQuery);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
