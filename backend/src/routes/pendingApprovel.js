//core module
const express = require("express");
const router = express.Router();

const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");

router.post("/pendingapprovel", validuser, async (req, res, next) => {
  try {
    if (req.data.jwtRole == "Admin") {
      const dbTrue = "true";
      const dbPendingList = await userrole.findAll({
        where: { pendingrequest: dbTrue },
        attributes: ["email"],
      });
      res.json({
        emaillist: dbPendingList,
      });
    } else {
      res.json({
        message: "Role mismatch",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  pendingapprovel: router,
};
