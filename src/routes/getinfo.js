//core module
const express = require("express");
const app = express();
const router = express.Router();

const {users} = require("../config/database.js");
const validuser = require("./checkvalid");

router.post("/getinfo", validuser,async (req, res, next) => {
  try {
    var {email} = req.body;
    var {name} = req.body;
    var {role} = req.body;
    // var db = await users.findOne({
    //   where: { email: email },
    //   attributes: ["name", "email", "isrole"],
    // });
    res.status(200).json({
      name: name,
      email: email,
      role: role,
    });
  } catch (e) {
      console.log(e);
        res.status(500).json({
        error: e,
        });
    }
});

  module.exports = {
      getinfo : router
  }