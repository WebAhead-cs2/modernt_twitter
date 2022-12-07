const bcrypt = require("bcryptjs");
const model = require("../database/db");
const home = require("./home");

function get(request, response) {
  return home.layout(/*html */ `
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  return new Promise((resolve, reject) => {

    const email = request.body.email;
    const password = request.body.password;
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => model.createUser({ email, password: hash }))
      .then(() => {
        resolve(home.layout(/*html */ ` <h1>Thanks for signing up, ${email}</h1>`));
      }).catch(error => {
        console.error(error);
        reject(`dear user ${error} try to sign up with another email.`);
      });
  });

}

module.exports = { get, post };