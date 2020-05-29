//core module
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//local module
const { users } = require("../config/database.js");
const { userrole } = require("../config/database.js");

const jwtKey = "sAnThOsHkUmAr"; //my_secret_key

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
        if (isRole == "User") pendingRequest = "false";
        try {
          if (isRole == "User" || isRole == "Admin" || isRole == "Seller") {
            var dbInsert = await users.create({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            var dbUserRoleInsert = await userrole.create({
              email: req.body.email,
              role: req.body.role,
              pendingrequest: pendingRequest,
            });
            res.json({
              message: "success",
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
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
  try {
    const dbUser = await users.findOne({
      where: { email: req.body.email },
      attributes: ["email", "password", "name"],
    });
    // console.log(dbUser.email);
    const dbUserRole = await userrole.findOne({
      where: { email: req.body.email },
      attributes: ["role", "pendingrequest"],
    });
    //  console.log(dbUserRole.pendingrequest);
    if (dbUser.email) {
      bcrypt.compare(req.body.password, dbUser.password, (err, result) => {
        if (err) {
          return res.json({
            message: "password mismatch",
          });
        }
        if (result) {
          if (dbUserRole.pendingrequest == "false") {
            var jwtEmail = dbUser.email;
            var jwtName = dbUser.name;
            var jwtRole = dbUserRole.role;
            const token = jwt.sign({ jwtName, jwtEmail, jwtRole }, jwtKey, {
              algorithm: "HS256",
              expiresIn: "1h",
            });
            return res.json({
              message: "success",
              token: token,
              role: dbUserRole.role,
              pendingrequest: dbUserRole.pendingrequest,
            });
          } else {
            return res.json({
              message: "Approvel pending",
              role: dbUserRole.role,
              pendingrequest: dbUserRole.pendingrequest,
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

module.exports = {
  userAuth: router,
};
