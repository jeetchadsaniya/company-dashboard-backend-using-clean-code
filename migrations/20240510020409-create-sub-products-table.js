'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE subProducts (
      subProductId INT AUTO_INCREMENT PRIMARY KEY,
      productName VARCHAR(30) NOT NULL,
      description VARCHAR(100) NOT NULL,
      productId INT,
      channelId INT,
      companyId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY (productName, companyId),
      UNIQUE KEY (productId, channelId),
      FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
      FOREIGN KEY (channelId) REFERENCES channels(channelId) ON DELETE CASCADE,
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
