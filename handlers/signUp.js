const bcrypt = require("bcryptjs");
const model = require("../database/db");
const home = require("./home");
const db = require("../database/connection");
const postHandler = require("./postHandler");

function get(request, response) {
  return home.layout(/*html */ `
  <h1 class ="title">Fiqra</h1>
  <p class="register">Register your account </p>
  <p class="register">Fill the details bellow to submit register account. </p>
  <div class="container">
    <form action="sign-up" method="POST">
      <label for="email">Email</label>
      <input class="input" type="email" placeholder="Enter Email" id="email" name="email">
      <label for="username">Username</label>
      <input id="username" name="username">
      <label for="password">Password</label>
      <input class="input" type="password" id="password" placeholder="Enter Password" name="password">
      <label for="age">Age</label>
      <input id="age" name="age" type="number">
      <p class="policy">By signing in, you’re agreed to our Terms & Condition and Privacy Policy.* </p>
      <button>Sign up</button>
    </form>
    <p class="login">Already have account?<a href="log-in">sign in!</a> </p>
    </div>
  

  `);
}

function post(request, response) {
  return new Promise((resolve, reject) => {

    const email = request.body.email;
    const password = request.body.password;
   // const age = request.body.age;
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