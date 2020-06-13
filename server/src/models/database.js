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
    status: Sequelize.STRING,
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

const product = sequelize.define(
  "userproduct",
  {
    id: {
      type: Sequelize.STRING,
      autoIncrement: true,
      primaryKey:true,
    },
    email: Sequelize.STRING,
    product_name: Sequelize.STRING,
    product_image: Sequelize.STRING,
    product_prize: Sequelize.INTEGER,
    product_category:Sequelize.STRING,
    product_companyname:Sequelize.STRING,
    product_warranty:Sequelize.STRING,
    product_assured:Sequelize.STRING,
    product_description: Sequelize.STRING,
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

const order = sequelize.define(
  "userorder",
  {
    id: {
      type: Sequelize.STRING,
      autoIncrement: true,
      primaryKey:true,
    },
    email: Sequelize.STRING,
    product_name: Sequelize.STRING,
    product_prize: Sequelize.INTEGER,
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

users.removeAttribute("id");
userrole.removeAttribute("id");
userPermission.removeAttribute("id");
// order.removeAttribute("id");

//exports
module.exports = {
  users: users,
  userrole: userrole,
  product: product,
  order:order,
};
