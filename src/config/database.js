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
    pass: Sequelize.STRING,
    isrole: Sequelize.STRING,
  },
  {
    tableName: "person",
    timestamps: false,
  }
);
users.removeAttribute("id");

//exports
module.exports={
    users : users
}