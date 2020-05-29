//core module
const Sequelize = require("sequelize");

//Databse connection
const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
const users = sequelize.define(
  "user",
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    tableName: "usertable",
    timestamps: false,
  }
);

const userrole = sequelize.define(
  "userrole",
  {
    email: Sequelize.STRING,
    role: Sequelize.STRING,
    pendingrequest: Sequelize.STRING,
  },
  {
    tableName: "userrole",
    timestamps: false,
  }
);

const userPermission = sequelize.define(
  "permission",
  {
    permission: Sequelize.STRING,
    role: Sequelize.STRING,
  },
  {
    tableName: "permission",
    timestamps: false,
  }
);

users.removeAttribute("id");
userrole.removeAttribute("id");
userPermission.removeAttribute("id");

//exports
module.exports={
    users : users,
    userrole : userrole
}