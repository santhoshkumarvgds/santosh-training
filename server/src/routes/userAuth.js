//core module
const express = require("express");
const session = require("express-session");
const router = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//local module
const { users, userrole } = require("../models/database.js");
const validuser = require("../middleware/checkvalid");

const jwtKey = process.env.JWT_KEY; //my_secret_key

//signup
router.post("/signup", async (req, res, next) => {
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
    // console.log(req.body.name);
    // console.log(req.body.role);
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.json({
          message: "error",
        });
      } else {
        var isRole = req.body.role;
        var pendingRequest = "true";
        var status = "pending";
        if (isRole == "User" || isRole == "Admin") {
          status = "approved";
          pendingRequest = "false";
        }
        try {
          if (isRole == "User" || isRole == "Seller" || isRole == "Admin") {
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
          console.log(e);
          res.json({
            message: "error",
          });
        }
      }
    });
  }
});

//login
router.post("/login", async (req, res, next) => {
  // console.log(req.body.email);
  // req.session.destroy();
  try {
    const dbUser = await users.findOne({
      where: { email: req.body.email },
      attributes: ["email", "password", "name"],
    });
    const dbUserRole = await userrole.findOne({
      where: { email: req.body.email },
      attributes: ["role", "pendingrequest", "status"],
    });
    if (dbUser.email) {
      bcrypt.compare(req.body.password, dbUser.password, (err, result) => {
        if (err) {
          return res.json({
            message: "password mismatch",
          });
        }
        if (result) {
          if (
            dbUserRole.pendingrequest == "false" &&
            dbUserRole.status != "reject" && dbUserRole.status !="pending"
          ) {
            // var jwtEmail = dbUser.email;
            // var jwtName = dbUser.name;
            // var jwtRole = dbUserRole.role;
            // const token = jwt.sign({ jwtName, jwtEmail, jwtRole }, jwtKey, {
            //   algorithm: "HS256",
            // });
            req.session.name = dbUser.name;
            req.session.email = dbUser.email;
            req.session.role = dbUserRole.role;
            return res.json({
              message: "success",
              // token: token,
              role: dbUserRole.role,
              pendingrequest: dbUserRole.pendingrequest,
            });
          } else {
            return res.json({
              message: "Approvel pending",
              role: dbUserRole.role,
              pendingrequest: dbUserRole.pendingrequest,
              status: dbUserRole.status,
            });
          }
        }
        res.json({
          message: "Password not match",
        });
      });
    } else {
      res.json({
        message: "Mail not exists",
      });
    }
  } catch (e) {
    // console.log(e);
    res.json({
      message: "Mail not exists",
    });
  }
});

router.post("/logout",validuser, (req, res, next) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");

    res.json({
      status: "success",
    });
  });
});

module.exports = {
  userAuth: router,
};
