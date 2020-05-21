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

const signup = async (req, res) => {
  //   console.log("checking");
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var isRole = req.body.role;
  var pendingRequest = "true";
  var token = "null";
  var check;
  if (isRole == "User") {
    pendingRequest = "false";
    token = jwt.sign({ name, email, pass, isRole, pendingRequest }, jwtKey, {
      algorithm: "HS256",
    });
  }

  dbconn.query(
    "select email from person where email=($1)",
    [email],
    (err, ress) => {
      if (err) throw err;
      try {
        check = ress.rows[0].email;
        console.log(check + " this email is already taken");
      } catch {
        dbconn.query(
          "insert into person(name,email,pass,isrole,pending_request,token)values($1,$2,$3,$4,$5,$6)",
          [name, email, pass, isRole, pendingRequest, token],
          (err, response) => {
            if (err) throw err;
            console.log(email + " sign up successful");
          }
        );
        //   console.log(pendingRequest);
        res.redirect("/");
      }
    }
  );
};

module.exports = {
  signup: signup,
};
