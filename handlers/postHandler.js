const home = require("./home");
const db = require("../database/connection");
const res = require("express/lib/response");

let posts = [
  { author: "Amal@halahala", title: "Arhebo", content: "halahalahala fekom arhebooo" },
  { author: "Ahmad@halahala", title: "Bulls vs Lions", content: "Bulls vs Lions who win?" },
  { author: "Moe@halahala", title: "Rawa2annn", content: "Rawa2" },
  { author: "Wael@halahala", title: "Let's GOOO!!!", content: "let's Go! Yalla" },
];

function newPost() {
  return home.layout(/*html */ `
      <h1>Add a new post</h1>
      <form action="/new-post" method="POST">
  
        <label for="title">
          Post title<span aria-hidden="true">*</span>
        </label>
        <input id="title" type="text" name="title" required>
  
        <label for="content">Post content</label>
        <textarea id="content" name="content"></textarea>
  
        <button type="submit">Save post</button>
      </form>
    `);
}

function addPost(request, response, emailUser, text_content) {
  return new Promise((resolve, reject) => {
    let data = request.body;
    // const username = data.username; 
    const email = data.email;
    if ((typeof emailUser == 'string') /*&& (typeof username == 'string') */) {
      db.query("SELECT * FROM users WHERE email=$1", [String(emailUser)]).then(result => {
        const user = result.rows;

        console.log("USER Adding Post" + user[0]);
        //get user Id 
        var user_id = user[0].id;
        const username = user[0].username;
        console.log("USER ID " + user_id);
        console.log(username);
        db.query("INSERT INTO blog_posts (text_content, user_id) VALUES($1, $2) RETURNING text_content, user_id ", [text_content, user_id]).then(result => console.log(result));
        return resolve(home.layout(/*html */ ` <h1>post added: ${text_content}</h1>`));
      }).catch(error => {
        console.log(error);
        return reject(error);
        //res.redirect('/');
      });
    }
  }); // new Promise
}

function deletePost(blog_id) {
  return new Promise((resolve, reject) => {
    //let data = request.body;
    // const username = data.username; 
    //const email = data.email;
    db.query("DELETE FROM blog_posts WHERE id=$1", [String(blog_id)]).then(result => {
      const user = result.rows;

      console.log("USER removing Post" + user[0]);
      // //get user Id 
      // var user_id = user[0].id;
      // const username = user[0].username;
      // console.log("USER ID " + user_id);
      // console.log(username);
      return resolve(home.layout(/*html */ ` <h1>post removed: ${blog_id}</h1>`));
    }).catch(error => {
      console.log(error);
      return reject(error);
      //res.redirect('/');
    });
  }); // new Promise
}

// function allPosts(posts) {
//   return home.layout(/*html */ `
//       <h1>All posts</h1>
//       <ul>
//         ${posts
//       .map(
//         (post) => `
//             <li>
//               <a href="/posts/${post.title}">${post.title}</a>
//               <p href="/posts/${post.content}"> ${post.content} </p> 
//               <a href="/posts/${post.author}">${post.author}</a>
//               <a href="/delete-post/${post.title}" aria-label="Delete post titled ${post.title}">🗑</a>
//             </li>
//           `
//       )
//       .join("")}
//       </ul>
//     `);
// }te

function allPosts(req, res) {
  db.query(
    `
    SELECT users.username, blog_posts.text_content, blog_posts.id
    FROM blog_posts LEFT JOIN users
    ON users.id = blog_posts.user_id
    ORDER BY users.id;
    `
  ).then(result => {
    const posts = result.rows;
    console.log(posts);
    const postsList = posts.map(
      post => `
      <li>
        <p href="/posts/${post.id}"> ${post.text_content} </p> 
        <a href="/delete-post/${post.id}" aria-label="Delete post ${post.text_content}">🗑xxx</a>
        <div>${post.username}</p>
      </li>
    `
    );
    //postsList.join("");
    // console.log(postsList);
    res.send(home.layout(/*html */ `
    <ul>${postsList.join("")}</ul>`));
  });
}
//<a href="/delete-post/${post.title}" aria-label="Delete post titled ${post.title}">🗑</a>
//<p href="/posts/${post.text_content}"> ${post.text_content} </p> 
//<p>${post.text_content}</p>
//   return home.layout(/*html */ `
//       <h1>All posts</h1>
//       <ul>
//         ${posts
//       .map(
//         (post) => `
//             <li>
//               <a href="/posts/${post.title}">${post.title}</a>
//               <p href="/posts/${post.content}"> ${post.content} </p> 
//               <a href="/posts/${post.author}">${post.author}</a>
//               <a href="/delete-post/${post.title}" aria-label="Delete post titled ${post.title}">🗑</a>
//             </li>
//           `
//       )
//       .join("")}
//       </ul>
//     `);

function post(post) {
  console.log(post);
  return home.layout(/*html */ `
      <main>${post.content}</main>
      <div>Written by ${post.author}</div>
      <a href="/delete-post/${post.content}" aria-label="Delete post titled ${post.content}">🗑</a>
    `);
}
//<h1>${post.title}</h1>
function error(message) {
  return home.layout(/*html*/ `
      <h1>${message}</h1>
    `);
}

module.exports = { deletePost, addPost, newPost, allPosts, post, error, posts };