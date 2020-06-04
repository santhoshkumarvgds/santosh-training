//core module
const Sequelize = require("sequelize");

//Databse connection
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);
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
    status : Sequelize.STRING,
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