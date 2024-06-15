"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    const addEventQuery = `
CREATE EVENT deleteInactiveUsers
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
    DELETE FROM users WHERE isPasswordSet = FALSE AND status = 'invited' AND TIMESTAMPDIFF(HOUR, createdAt, NOW()) > 24;
END; 
  `;

    await queryInterface.sequelize.query(addEventQuery);
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
