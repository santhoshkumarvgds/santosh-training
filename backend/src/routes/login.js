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
    console.log(dbToken.token);
    if (dbToken.token == "null") {
        res.status(200).send(lgEmail + " Your request is pending");
    }
    else {
          try {
            payload = jwt.verify(dbToken.token, jwtKey);
            // console.log(payload);
            var mykey = crypto.createDecipher("aes-128-cbc", "sAnThOsH");
            var decrypass = mykey.update(payload.crypass, "hex", "utf8");
            decrypass += mykey.final("utf8");
            // console.log(decrypass);
            if (lgPass == decrypass){
              res.status(200).send(lgEmail + " your sign in is approved");
            }

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
        res.status(200).send("Please enter valid email");
      }
};
const validation = (req,res)=>{
  var token=validationcheck(req.body.token,"validation");
  if(token){
    res.status(200).send("valid user");
  }
  else{
    res.status(200).send("user approvel is pending or inavlid token");
  }
}

const getInfo=async (req,res)=>{
  var token= await validationcheck(req.body.token,"getinfo");
  // console.log(token);
  if(token){
  var payload = jwt.verify(token, jwtKey);
  res.status(200).json({
    user_name :`${payload.name}`,
    user_mail:`${payload.email}`,
    user_role:`${payload.isRole}`
  });
  }
  else{
    res.status(200).json({token:"invalid token"})
  }
}
const validationcheck = async(token,func)=>{
  try{
  var dbToken = await users.findOne({
        where:{token:token},
        attributes : ['token']
    });
    if(dbToken.token == token && func=="validation") return true;
    else if(dbToken.token == token && func=="getinfo") return dbToken.token;
    else return false;
  }
  catch(e){
        console.log(e);
    }
}

module.exports = {
  login: login,
  validation:validation,
  getInfo:getInfo
};
