function layout(content, loggedIn) {
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
    return layout(/*html */ `
    <h1>Create an account</h1>
    <p>New users <a href="sign-up">sign up for an account</a> or existing users <a href="log-in">log in</a>
  `);
}

module.exports = { get, layout };
