"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const insertDataQuery = `
    INSERT INTO permission (\`read\`, \`write\`, \`delete\`) 
VALUES 
  (1, 0, 0),
  (1, 1, 0),
  (1, 0, 1),
  (1, 1, 1);
  `;

    await queryInterface.sequelize.query(insertDataQuery);
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
