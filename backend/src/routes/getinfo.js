//core module
const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key

const { users } = require("../config/database.js");
const validuser = require("./checkvalid");

router.post("/getinfo", validuser, async (req, res, next) => {
  try {
    // console.log(req.body.token);
    // console.log(validuser);
    const tokenVerify = jwt.verify(req.body.token, jwtKey);
    // var {email} = req.body;
    // var {name} = req.body;
    // var {role} = req.body;
    // var db = await users.findOne({
    //   where: { email: email },
    //   attributes: ["name", "email", "isrole"],
    // });
    res.json({
      name: tokenVerify.jwtName,
      email: tokenVerify.jwtEmail,
      role: tokenVerify.jwtRole,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
});

module.exports = {
  getinfo: router,
};
