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
    forgot_password: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "usertable",
    timestamps: false,
  }
);

const userrole = sequelize.define(
  "userrole",
  {
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
    doj: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: sequelize.fn("NOW"),
    },
  },
  {
    tableName: "userrole",
    timestamps: false,
  }
);

const userPermission = sequelize.define(
  "permission",
  {
    permission: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING,
    },
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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: "usertable",
        key: "email",
      },
    },
    product_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_prize: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    product_category: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_companyname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_warranty: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_assured: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: "usertable",
        key: "email",
      },
    },
    product_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    product_prize: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

const productReview = sequelize.define(
  "productreview",
  {
    product_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_comment: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_rating: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "product_review",
    timestamps: false,
  }
);

const timing = sequelize.define(
  "timing",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    operation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "timing",
    timestamps: false,
  }
);

users.removeAttribute("id");
userrole.removeAttribute("id");
userPermission.removeAttribute("id");
productReview.removeAttribute("id");


sequelize.sync({ force: false }).then(async () => {
  const email = "adminrole@admin.com";
  const length = await users.findOne({
    where: { email: email },
  });
  if (!length) {
    const hash = "$2b$10$GQBuZ.K/V2Usejl0a.orSuf4SeUt4QnEgf71810LKMV3eMoKJzqlO"; //123
    const adminInsert = await users.create({
      name: "AdminRole",
      email: email,
      password: hash,
    });
    var dbUserRoleInsert = await userrole.create({
      email: email,
      role: "Admin",
      pendingrequest: "false",
      status: "Accept",
    });
    var dbIntervalInsert = await timing.create({
      operation: "interval",
      value: 2,
    });
    console.log("Defalut Admin & timing interval Added");
  }
});

//exports
module.exports = {
  users: users,
  userrole: userrole,
  product: product,
  order: order,
  productReview: productReview,
  timing: timing
};
