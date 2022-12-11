const bcrypt = require("bcryptjs");
const model = require("../database/db");
const home = require("./home");
const db = require("../database/connection");
const postHandler = require("./postHandler");

function get(request, response) {
  return home.layout(/*html */ `
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="username">Username</label>
      <input id="username" name="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <label for="age">Age</label>
      <input id="age" name="age" type="number">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  return new Promise((resolve, reject) => {

    const email = request.body.email;
    const password = request.body.password;
    const age = request.body.age;
    const location = request.body.location;
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => model.createUser(request, response, hash))
      .then(() => {
        return resolve(home.layout(/*html */ ` <h1>Thanks for signing up, ${email}</h1>`))
      }).catch(error => {
        console.error(error);
        return reject(`dear user ${error} try to sign up with another email.`);
      });
  });

}

//{ email, password: hash }
module.exports = { get, post };