const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const model = require("../database/db");
const home = require("./home");
const db = require("../database/connection");
const postHandler = require("./postHandler");
const { type } = require("express/lib/response");

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
  return new Promise((resolve, reject) => {
  const email = request.body.email;
  const password = request.body.password;
  console.log(typeof password);
  model.getUser(email)
    .then(dbUser => bcrypt.compare(password, String(dbUser.password)))
    .then(match => {
      if (!match) {
        return reject( new Error("Password mismatch"));
        //return reject( home.layout(/*html */`<h1> ${email}, Password mismatch </h1>`));
      }
      return resolve(home.layout(/*html */ ` <h1>logging in Succeded, ${email}</h1>`));
    })
    .catch(error => {
      console.log("Catched in logIn.post " + error.message);
      return reject(error);    
    });
  });
}


module.exports = { get, post };
