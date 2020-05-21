const getLogin = (req, res) => {
  res.sendfile("index.html");
};
const getSignup = (req, res) => {
  res.sendfile("src/pages/signup.html");
};
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
};
