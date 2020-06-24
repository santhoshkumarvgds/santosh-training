//core module
const express = require("express");
const router = express.Router();

const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");
const roleCheck = require("../middleware/roleCheck");

router.post("/acceptreject", roleCheck("Admin"), async (req, res, next) => {
      userrole.update(
        { status: req.body.status, pendingrequest: "false" },
        { where: { email: req.body.email } }
      );
        res.json({
          status:req.body.status
        })
});

module.exports = {
  acceptReject: router,
};
