"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE users (
      userId INT AUTO_INCREMENT,
      companyId INT,
      userName VARCHAR(30) NOT NULL,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(100),
      status VARCHAR(10) NOT NULL CHECK (status IN ('invited', 'active', 'blocked')),
      createdBy INT, 
      rollId INT,
      isPasswordSet BOOLEAN, 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY(userId, companyId),
      FOREIGN KEY (companyId) REFERENCES companies(companyId) ON DELETE CASCADE,
      FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL,
      FOREIGN KEY (rollId) REFERENCES rolls(rollId)
  );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
