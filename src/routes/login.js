const {users} = require("./db");
const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key
const crypto = require("crypto");

const login = async (req, res) => {
  // console.log("login check");
  var lgEmail = req.body.email;
  var lgPass = req.body.password;
  var payload;
  try {
    var dbToken = await users.findOne({
        where:{email:lgEmail},
        attributes : ['token']
    });
    if (dbToken.token == "null") {
        console.log(lgEmail + " Your request is pending");
    }
    else {
          try {
            payload = jwt.verify(dbToken.token, jwtKey);
            // console.log(payload);
            var mykey = crypto.createDecipher("aes-128-cbc", "sAnThOsH");
            var decrypass = mykey.update(payload.crypass, "hex", "utf8");
            decrypass += mykey.final("utf8");
            // console.log(decrypass);
            if (lgPass == decrypass)
              console.log(lgEmail + " your sign in is approved");
            else console.log(lgEmail + " your password is wrong!!");
          } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
              return res.status(401).end();
            }
            return res.status(400).end();
          }

        }
      }
      catch(e){
        console.log("Please enter valid email");
      }
};

module.exports = {
  login: login,
};
