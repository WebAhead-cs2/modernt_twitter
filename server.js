const home = require("./handlers/home");
const logIn = require("./handlers/logIn");
const signUp = require("./handlers/signUp");
const postHandler = require("./handlers/postHandler");
const cookieParser = require("cookie-parser");
let thePosts = postHandler.posts;


const express = require("express");
//const res = require("express/lib/response");
const PORT = process.env.PORT || 3000;


const server = express();


server.use(cookieParser());
// This is instead of the getBody funtion. the server will parse the request into json and then we access the body. by request.body;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("styles/"));

server.get("/", (req, res) => {
    const email = req.cookies.email;
    if (email) {
        res.send(home.layout(/*html */ `
          <h1>Welcome ${email} </h1>
          <a href="/log-out">Log out</a>
        `));
    } else {
       res.send(home.get(req, res));
    }
});

server.get("/new-post", (req, res) => {
    const email = req.cookies.email;
    if (!email) {
        const html = postHandler.error("You must be logged in to write posts");
        res.status(401).send(html);
    } else {
        const html = postHandler.newPost();
        res.send(html);
    }
});

server.get("/posts", (req, res) => {
    const html = postHandler.allPosts(req,res);
    //res.send(html);
});

server.post("/new-post", (req, res) => {
    const newPost = req.body;
    const email = req.cookies.email;
    newPost.author = email;
    //thePosts.push(newPost);
    const content = newPost.content;
    console.log(content);
    postHandler.addPost(req, res,email, content).then(html => res.send(html)).catch(error => {
        res.send(home.layout(/*html */ `
              <h1>${error} </h1> 
            `));
    });
    //res.redirect("/posts");
});

server.get("/posts/:content", (req, res) => {
    //console.log(req.params.title);
   // console.log(thePosts);

    const post = thePosts.find((p) => p.title === req.params.title);
    const html = postHandler.post(post);
    res.send(html);
});

server.get("/delete-post/:id", (req, res) => {
    //thePosts = thePosts.filter((p) => p.title !== req.params.title);
    const blog_id= req.params.id;
    postHandler.deletePost(blog_id).then(html => res.send(html)).catch(error => {
        res.send(home.layout(/*html */ `
              <h1>${error} </h1> 
            `));
    });
   // res.redirect("/posts");
});


server.get("/sign-up", (req, res) => {
    const html= signUp.get(req, res);
    res.send(html);
});

server.post("/sign-up", (req, res) => {
    signUp.post(req, res).then(html => res.send(html)).catch(error => {
        res.send(home.layout(/*html */ `
              <h1>${error} </h1> 
            `));
    });
    
});

server.get("/log-in", (req, res) => {
    const html = logIn.get(req, res);
    res.send(html);
});

server.post("/log-in", (req, res) => {
    const email = req.body.email;
    console.log(email);
    res.cookie("email", email, { maxAge: 600000 });
    logIn.post(req, res).then(html => res.send(html)).catch(error => {
        res.send(home.layout(/*html */ `
              <h1>${error} </h1> 
            `));
    });
   
});

server.get("/log-out", (req, res) => {
    res.clearCookie("email");
    res.redirect("/");
});


server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));