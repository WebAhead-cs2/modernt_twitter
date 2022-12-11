const db = require("../database/connection");
//const postHandler = require("./postHandler");

function layout(content) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>learning</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/new-post">Write new post</a>
            <a href="/posts">All posts</a>
          </nav>
        </header>
        ${content}
      </body>
    </html>
  `;
}

function get(request, response) {
    //response.writeHead(200, { "content-type": "text/html" });
    // db.query("SELECT username FROM users").then(result => {
    //   const users = result.rows;
    //   // create a list item for each user in the array
    //   const userList = users.map(user => `<li>${user.username}</li>`);
    //   // use .join to turn the array into a string
    // //  res.status(200).send(`<ul>${userList.join("")}</ul>`);
    // });
    return layout(/*html */ `
    <h1>Create an account</h1>
    <p>New users <a href="sign-up">sign up for an account</a> or existing users <a href="log-in">log in</a>
  `);
}

module.exports = { get, layout };

