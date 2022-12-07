const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const model = require("../database/db");
const home = require("./home");

function get(request, response) {
  //response.writeHead(200, { "content-type": "text/html" });
  return (home.layout(/*html */ `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input id="author" type="email" name="email" required>
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button type="submit">Log in</button>
    </form>
  `));
}

function post(request, response) {
  const email = request.body.email;
  const password = request.body.password;
  model
    .getUser(email)
    .then(dbUser => bcrypt.compare(password, dbUser.password))
    .then(match => {
      if (!match) throw new Error("Password mismatch");
      return;
    })
    .catch(error => {
      console.error(error);
      //response.writeHead(401, { "content-type": "text/html" });
      return (postHandler.error(error));
    });

}

module.exports = { get, post };
