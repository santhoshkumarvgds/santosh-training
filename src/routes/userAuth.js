//core module
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//local module
const {users} = require("../config/database.js");



const jwtKey = "sAnThOsHkUmAr"; //my_secret_key

//signup
router.post("/signup", async (req, res, next) => {
  try {
    var dbEmail = await users.findOne({
      where: { email: req.body.email },
      attributes: ["email"],
    });
    if (dbEmail.email) {
      res.status(409).json({
        message: "Mail exists",
      });
    }
  } catch (e) {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        var isRole = req.body.role;
        var pendingRequest = "true";
        var token = "null";

        try {
          var dbInsert = await users.create({
            name: req.body.name,
            email: req.body.email,
            pass: hash,
            isrole: isRole,
            pending_request: pendingRequest,
            token: token,
          });
          res.status(200).json({
            status: "success",
          });
        } catch (e) {
          res.status(500).json({
            error: e,
          });
        }
      }
    });
  }
});

//login
router.post("/login", async (req, res, next) => {
    console.log(req.body.email);
  try {
    const db = await users.findOne({
      where: { email: req.body.email },
      attributes: ["email", "pass", "isrole"],
    });
    if (db.email) {
      bcrypt.compare(req.body.password, db.pass, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "password mismatch",
          });
        }
        if (result) {
          if (db.isrole == "User") {
            var jwtEmail = db.email;
            var jwtRole = db.isrole;
            const token = jwt.sign({ jwtEmail, jwtRole }, jwtKey, {
              algorithm: "HS256",
              expiresIn: "1h",
            });
            return res.status(200).json({
              status: "success"
            });
          } else {
            return res.status(401).json({
              message: "Approvel pending",
            });
          }
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    } else {
      res.status(401).json({
        message: "Mail not exists",
      });
    }
  } catch (e) {
      console.log(e);
    res.status(500).json({
      error: e,
    });
  }
});

module.exports = {
    userAuth : router
}