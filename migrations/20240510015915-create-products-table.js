'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE products (
      productId INT AUTO_INCREMENT PRIMARY KEY,
      price INT NOT NULL,
      companyId INT,
      imageUrl VARCHAR(150) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
