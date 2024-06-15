'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE channels (
      channelId INT AUTO_INCREMENT PRIMARY KEY,
      channelName VARCHAR(30) NOT NULL,
      channelCode VARCHAR(30) NOT NULL,
      companyId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY (channelCode,companyId),
      UNIQUE KEY (channelName,companyId),
      FOREIGN KEY (companyId) REFERENCES companies(companyId) ON DELETE CASCADE
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
