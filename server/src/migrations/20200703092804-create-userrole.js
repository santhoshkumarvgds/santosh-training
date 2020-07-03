"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("userrole", {
        email: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
          references: {
            model: "usertable",
            key: "email",
          },
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        pendingrequest: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      })
      .then((x) =>
        queryInterface.sequelize.query(`
      insert into userrole(email,role,pendingrequest,status) values('adminrole@admin.com','Admin','false','accept');
    `)
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("userroles");
  },
};
