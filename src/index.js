//core module
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//local module
const {userAuth} = require("./routes/userAuth");
const {getinfo} = require("./routes/getinfo");

app.use("/user", userAuth);

app.use("/user",getinfo);

app.listen(port, () => console.log(`started https://loacalhost:${port}`));
