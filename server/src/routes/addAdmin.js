//core module
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");

router.post("/addadmin", validuser, async (req, res, next) => {
  if (req.session.role == "Admin") {
    try {
      var dbEmail = await users.findOne({
        where: { email: req.body.email },
        attributes: ["email"],
      });
      if (dbEmail.email) {
        res.json({
          message: "Mail exists",
        });
      }
    } catch (e) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.json({
            message: "error",
          });
        } else {
          var isRole = req.body.role;
          status = "approved";
          pendingRequest = "false";
          try {
            if (isRole == "Admin") {
              var dbInsert = await users.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });
              var dbUserRoleInsert = await userrole.create({
                email: req.body.email,
                role: req.body.role,
                pendingrequest: pendingRequest,
                status: status,
              });
              res.json({
                message: "success",
              });
            } else {
              res.json({
                message: "Role mismatch",
              });
            }
          } catch (e) {
            res.json({
              message: "error",
            });
          }
        }
      });
    }
  } else {
    res.json({
      message: "Role mismatch",
    });
  }
});

module.exports = {
  addAdmin: router,
};
