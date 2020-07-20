//core module
const express = require("express");
const router = express.Router();
var CronJob = require("cron").CronJob;
const Sequelize = require("sequelize");

const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");
const roleCheck = require("../middleware/roleCheck");

const interval = 2;

router.post("/acceptreject", roleCheck("Admin"), async (req, res, next) => {
      userrole.update(
        { status: req.body.status, pendingrequest: "false" },
        { where: { email: req.body.email } }
      );
        res.json({
          status:req.body.status
        })
});

router.post("/changeinterval", roleCheck("Admin"), async (req, res) => {
  interval = req.params.interval;
  console.log(interval);
  res.json({
    message : "interval successfully changed"
  })
});

var job = new CronJob(
  "0 0 0 */"+interval+" * *",
  function () {
   userrole.update(
     { status: "Reject", pendingrequest: "false" },
     {
       where: {
         doj: {
           [Sequelize.Op.between]: [
             new Date(Date.now() - 48 * 3600 * 1000),
             new Date(Date.now()),
           ],
         },
         status: "pending",
       },
     }
   );
  console.log("Before two days pending approvel sellers are succesfully rejected");
  },
  null,
  true
);
job.start();

module.exports = {
  acceptReject: router,
};
