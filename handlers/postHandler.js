const home = require("./home");
const db = require("../database/connection");

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

function allPosts(posts) {
    return home.layout(/*html */ `
      <h1>All posts</h1>
      <ul>
        ${posts
            .map(
                (post) => `
            <li>
              <a href="/posts/${post.title}">${post.title}</a>
              <p href="/posts/${post.content}"> ${post.content} </p> 
              <a href="/posts/${post.author}">${post.author}</a>
              <a href="/delete-post/${post.title}" aria-label="Delete post titled ${post.title}">🗑</a>
            </li>
          `
            )
            .join("")}
      </ul>
    `);
}

function post(post) {
    console.log(post);
    return home.layout(/*html */ `
      <h1>${post.title}</h1>
      <main>${post.content}</main>
      <div>Written by ${post.author}</div>
    `);
}

function error(message) {
    return home.layout(/*html*/ `
      <h1>${message}</h1>
    `);
}

module.exports = { newPost, allPosts, post, error , posts};