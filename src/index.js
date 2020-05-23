const validuser = require("./routes/checkvalid");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key
const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
const users = sequelize.define(
  "user",
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    pass: Sequelize.STRING,
    isrole: Sequelize.STRING,
  },
  {
    tableName: "person",
    timestamps: false,
  }
);
users.removeAttribute("id");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/signup", async (req, res, next) => {
  // console.log("check");
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
app.use("/login", async (req, res, next) => {
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
              status: "success",
              token: token,
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
    res.status(500).json({
      error: e,
    });
  }
});
app.use("/getinfo", validuser, async (req, res, next) => {
  try {
    var token = jwt.verify(req.body.token, jwtKey);
    // console.log(token.jwtEmail);
    var db = await users.findOne({
      where: { email: token.jwtEmail },
      attributes: ["name", "email", "isrole"],
    });
    res.status(200).json({
      name: db.name,
      email: db.email,
      role: db.isrole,
      message: " valid user",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

app.listen(port, () => console.log(`started https://loacalhost:${port}`));
