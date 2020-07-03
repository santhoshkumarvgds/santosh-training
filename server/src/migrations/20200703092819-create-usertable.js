'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("usertable", {
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      })
      .then((x) =>
        queryInterface.sequelize.query(`
      insert into usertable(name,email,password) values('AdminRole','adminrole@admin.com','$2b$10$GQBuZ.K/V2Usejl0a.orSuf4SeUt4QnEgf71810LKMV3eMoKJzqlO');
    `)
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usertable');
  }
};