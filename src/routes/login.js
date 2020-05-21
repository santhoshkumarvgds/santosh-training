const jwt = require("jsonwebtoken");
const jwtKey = "sAnThOsHkUmAr"; //my_secret_key
const { Pool, Client } = require("pg"); //postgres
const dbconn = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

const login = (req, res) => {
  var lgEmail = req.body.email;
  var lgPass = req.body.password;
  var check;
  dbconn.query(
    "select token from person where email=$1",
    [lgEmail],
    (err, ress) => {
      var payload;
      try {
        check = ress.rows[0].token;
        // console.log(check);
        if (check == "null") {
          console.log(lgEmail + " Your request is pending");
        } else {
          try {
            payload = jwt.verify(check, jwtKey);
          } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
              return res.status(401).end();
            }
            return res.status(400).end();
          }
          //   console.log(
          //     `sucessful login \nname ${payload.name}\nemail ${payload.email} \nrole ${payload.isRole} \npendinRequest ${payload.pendingRequest}\nThe token is ${check}`
          //   );
          console.log(lgEmail + " your sign in is approved");
          //   res.send("hi");
          // res.redirect("src/pages/welcome.html");
        }
      } catch {
        console.log("please enter valid email");
      }
    }
  );
};

module.exports = {
  login: login,
};
