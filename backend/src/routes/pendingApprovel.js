//core module
const express = require("express");
const app = express();
const router = express.Router();

const { users, userrole } = require("../config/database.js");
const validuser = require("./checkvalid");

router.post("/pendingapprovel", async (req, res, next) => {
  try {
    // console.log("connect");
    const dbTrue = "true";
    const dbPending = await userrole.findAll({
      where: { pendingrequest: dbTrue },
      attributes: ["email"],
    });
    // console.log(dbPending);
    res.json({
      emaillist: dbPending  ,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  pendingapprovel: router,
};
