const {users} = require("./db");
const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key
const crypto = require("crypto");
const Sequelize = require("sequelize");

const signup = async (req, res) => {
  //   console.log("checking");
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var isRole = req.body.role;
  var pendingRequest = "true";
  var token = "null";
  var mykey = crypto.createCipher("aes-128-cbc", "sAnThOsH");
  var crypass = mykey.update(pass, "utf8", "hex");
  crypass += mykey.final("hex");
  if (isRole == "User") {
    pendingRequest = "false";
    token = jwt.sign({ name, email, crypass, isRole, pendingRequest }, jwtKey, {
      algorithm: "HS256",
    });
  }
  // console.log("database connection success");
  try {
    var dbEmail = await users.findOne({
        where:{email:email},
        attributes : ['email']
    });
    console.log(dbEmail.email + " this email is already taken");
  } catch (e) {
    // console.log(e);
    var dbInsert = await users.create({
      name: name,
      email: email,
      pass: pass,
      isrole: isRole,
      pending_request: pendingRequest,
      token: token,
    });
    console.log(email + " sign up successful");
  }
};

module.exports = {
  signup: signup,
};
