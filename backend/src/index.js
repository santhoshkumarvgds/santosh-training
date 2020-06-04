//core module
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//local module
const { userAuth } = require("./routes/userAuth");
const { getinfo } = require("./routes/getinfo");
const { pendingapprovel } = require("./routes/pendingApprovel");
const { acceptReject } = require("./routes/acceptRejectUser");
const { addAdmin } = require("./routes/addAdmin");

app.use("/user", userAuth);

app.use("/user", getinfo);

app.use("/user", pendingapprovel);

app.use("/user", acceptReject);

app.use("/user", addAdmin);

app.listen(port, () => console.log(`started https://loacalhost:${port}`));
