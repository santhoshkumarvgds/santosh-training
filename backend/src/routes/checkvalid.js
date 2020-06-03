const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key
module.exports = (req, res, next) => {
  try {
    const tokenVerify = jwt.verify(req.headers.authorization, jwtKey);
    // console.log(tokenVerify);
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "token invalid",
    });
  }
};
