"use strict";

module.exports = {
  up: async ({ context: queryInterface }) => {
    let str = "";
    let arr = [];
    for (let i = 1; i <= 4; i++) {
      str += `${i}`;
      for (let j = 1; j <= 4; j++) {
        str += `${j}`;
        for (let k = 1; k <= 4; k++) {
          str += `${k}`;
          arr.push(str);
          str = str.substring(0, 2);
        }
        str = str.substring(0, 1);
      }
      str = "";
    }

    const insertDataQuery = `
      INSERT INTO rolls (channelPermissionId, productPermissionId, userPermissionId) 
      VALUES 
        ${arr.map((item) => `(${item[0]}, ${item[1]}, ${item[2]})`).join(",\n")};
    `;

    await queryInterface.sequelize.query(insertDataQuery);
  },

  down: async (queryInterface, Sequelize) => {
    // Add reverting commands here.
    // Example:
    // await queryInterface.dropTable('users');
  },
};
