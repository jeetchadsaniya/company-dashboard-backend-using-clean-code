'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE rolls (
      rollId INT AUTO_INCREMENT PRIMARY KEY,
      channelPermissionId INT,
      productPermissionId INT,
      userPermissionId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (channelPermissionId) REFERENCES permission(permissionId),
      FOREIGN KEY (productPermissionId) REFERENCES permission(permissionId),
      FOREIGN KEY (userPermissionId) REFERENCES permission(permissionId)
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
