'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE companies (
        companyId INT AUTO_INCREMENT PRIMARY KEY,
        companyName VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    // Execute the raw SQL query
    await queryInterface.sequelize.query(createTableQuery);
  },

  async down (queryInterface, Sequelize) {
  }
};
