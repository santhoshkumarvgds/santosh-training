const Sequelize = require("sequelize");
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
    pending_request: Sequelize.STRING,
    token: Sequelize.STRING,
  },
  {
    tableName: "person",
    timestamps: false,
  }
);
users.removeAttribute("id");
module.exports = {
    users:users
}