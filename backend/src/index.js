//core module
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//local module
const {userAuth} = require("./routes/userAuth");
const { getinfo } = require("./routes/getinfo");
const { pendingapprovel } = require("./routes/pendingApprovel");
const { acceptReject } = require("./routes/acceptRejectUser");

app.use("/user", userAuth);

app.use("/user", getinfo);

app.use("/user", pendingapprovel);

app.use("/user", acceptReject);

app.listen(port, () => console.log(`started https://loacalhost:${port}`));
