//core module
const express = require("express");
const router = express.Router();

const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");

router.post("/accept", validuser, async (req, res, next) => {
  try {
    if (req.session.role == "Admin") {
      userrole.update(
        { status: "approved", pendingrequest: "false" },
        { where: { email: req.body.email } }
      );
    } else {
      res.json({
        message: "Role mismatch",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/reject", validuser, async (req, res, next) => {
  try {
    if (req.session.role == "Admin") {
      userrole.update(
        { status: "reject", pendingrequest: "false" },
        { where: { email: req.body.email } }
      );
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
  acceptReject: router,
};
