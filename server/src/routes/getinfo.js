//core module
const express = require("express");
const router = express.Router();

const validuser = require("../middleware/checkvalid");

router.post("/getinfo", validuser, async (req, res, next) => {
  try {
    res.json({
      name: req.data.jwtName,
      email: req.data.jwtEmail,
      role: req.data.jwtRole,
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
