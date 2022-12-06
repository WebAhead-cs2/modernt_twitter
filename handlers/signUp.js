const bcrypt = require("bcryptjs");
const getBody = require("../getBody");
const model = require("../database/db");

function get(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(`
    <h1 id="create">Create an account</h1>
    <div id="main" >
    <form action="sign-up" method="POST" id="signup">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button id ="button">Sign up</button>
    </form>
    </div>
  `);
}

function post(request, response) {
  getBody(request)
    .then(body => {
      const user = new URLSearchParams(body);
      const email = user.get("email");
      const password = user.get("password");
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => model.createUser({ email, password: hash }))
        .then(() => {
          response.writeHead(200, { "content-type": "text/html" });
          response.end(`
            <h1>Thanks for signing up, ${email}</h1>
          `);
        })
        .catch(error => {
          console.error(error);
          response.writeHead(500, { "content-type": "text/html" });
          response.end(`
            <h1>Something went wrong, sorry</h1>
            <p>${error}</p> 
          `);
        });
    })
    .catch(error => {
      console.error(error);
      response.writeHead(500, { "content-type": "text/html" });
      response.end(`
        <h1>Something went wrong, sorry</h1>
      `);
    });
}

module.exports = { get, post };
