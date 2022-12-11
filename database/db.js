const { hash } = require("bcryptjs");
const { type } = require("express/lib/response");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { resourceLimits } = require("worker_threads");
const db = require("./connection");
const dbPath = path.join(__dirname, "db.json");
const initialData = { users: [] };

// create db.json if it doesn't exist yet
try {
  const dbFileExists = fs.existsSync(dbPath);
  if (!dbFileExists) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
} catch (error) {
  console.error("Error creating db.json");
  console.error(error);
}

// function getUsers() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(dbPath, (error, contents) => {
//       if (error) {
//         reject(error);
//       } else {
//         const data = JSON.parse(contents);
//         resolve(data.users);
//       }
//     });
//   });
// }


function getUsers() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users").then(result => {
      const users = result.rows;
      const userList = users.map((user) => user.username);
      return resolve(userList);
    }).catch(error => {
      console.log(error);
       return reject(error);
      });
  });
}


function getUser(email) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users" ,/*[String(email)]*/).then(result => {
      const users = result.rows;
      for( var i = 0; i< users.length ; i++){
        if(users[i].email == email){
          // console.log(users[i]);
          console.log(users[i].password);
          return resolve(users[i]);
          //return users[i];
        }
      }
      return reject(`${email} not found in users`);
      }).catch(error => { 
      console.log("catched in GETUSER " + error);
      return reject(error.message);
      //throw(error);
      });
  });
}
// }

// function createUser(user) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(dbPath, (error, contents) => {
//       if (error) {
//         reject(error);
//       } else {
//         const data = JSON.parse(contents);
//         const existingUser = data.users.find(u => u.email === user.email);
//         if (existingUser) {
//           reject(new Error(`${user.email} already exists`));
//         } else {
//           user.id = Date.now(); // rudimentary unique ID
//           data.users.push(user);
//           fs.writeFile(dbPath, JSON.stringify(data, null, 2), error => {});
//           resolve(user);
//         }
//       }
//     });
//   });
// }

// function createUser(user) {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT email FROM users", [email]).then(() => {

//       reject(new Error(`${user.email} already exists`));
//     }).catch(){
//       db.query("INSERT INTO users(email, username, age, location) VALUES($1, $2, $3, $4)", [email, username, age, location]).then(() => {
//         resolve(user);
//         })
//     }
//     db.query("INSERT INTO users(username, age, location) VALUES($1, $2, $3)", [email, username, age, location]).then(() => {
      
//     });(dbPath, (error, contents) => {
//       if (error) {
//         reject(error);
//       } else {
//         const data = JSON.parse(contents);
//         const existingUser = data.users.find(u => u.email === user.email);
//         if (existingUser) {
//           reject(new Error(`${user.email} already exists`));
//         } else {
//           user.id = Date.now(); // rudimentary unique ID
//           data.users.push(user);
//           fs.writeFile(dbPath, JSON.stringify(data, null, 2), error => {});
//           resolve(user);
//         }
//       }
//     });
//   });
// }

function createUser(req, res, hashedpassword) {
  return new Promise((resolve,reject) =>{
  let data = req.body;
  //console.log(data); // e.g. { username: "amal", ... }
  const email = data.email;
  const username = data.username; 
  const age = data.age;
  const password = data.password;
  console.log(email);
  console.log(username);
  console.log(age);
  console.log(typeof age);
  console.log(data.password);
  console.log(hashedpassword);
    if((typeof email == 'string') && (typeof username == 'string') && (typeof age == 'string') &&  (typeof password == 'string')) {
      db.query("SELECT email FROM users" ,/*[String(email)]*/).then(result => {
        const users = result.rows;
        console.log("ALL USERS " + users[0]);
        for( var i = 0; i< users.length ; i++){
          if(users[i].email == email){
            return reject(`${email} already exists`);
          }
        }
        console.log("Now user email not found; adding HEREEE");
        db.query("INSERT INTO users(email, username,password, age) VALUES($1, $2, $3, $4)", [email, username,hashedpassword, age]).then(result => {
        //  const user_inserted = result.rows;
        //  console.log(user_inserted);
         // db.query("SELECT * FROM users WHERE email = $1" ,['amal@123']).then(result=> console.log(result.rows));
          return resolve(result);
        });
       // } 
     
      }).catch(error => {
        console.log(error);
        return reject(error);
          //res.redirect('/');
        });
      }
    });
  }
// }
//   catch(error){
//   console.log(error);
//   reject(new Error(`${user.email} already exists`));
//   //res.status(500).send(`<h1>Something went wrong saving your data after submitting</h1>`);
// }

//}
// .then(hash => model.createUser({ email, password: hash }))
//       .then(() => {
//         resolve(home.layout(/*html */ ` <h1>Thanks for signing up, ${email}</h1>`));
//       }).catch(error => {
//         console.error(error);
//         reject(`dear user ${error} try to sign up with another email.`);
//       });
module.exports = { getUsers, getUser, createUser };
