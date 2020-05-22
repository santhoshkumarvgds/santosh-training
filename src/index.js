
//signup
const { signup } = require("./routes/sigup");

//login
const { login } = require("./routes/login");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const path = require("path");
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.post("/login", login);
app.post("/signup", signup);
app.listen(port, () => console.log(`started https://loacalhost:${port}`));
