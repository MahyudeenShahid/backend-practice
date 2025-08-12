const express = require('express');
const mysql = require('mysql2');
const Path = require('path');
const {v4: uuidv4}= require('uuid');
const { faker } = require('@faker-js/faker');
const methodOverride = require('method-override');


const app = express();
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'user',
  password: 'Ju@tt1122'
});

const PORT =8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const createRandomUser=()=> {
//   return [
//      faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//      faker.internet.email(),
//     faker.image.avatar(),
//    faker.internet.password(),
    
    
//   ];
// }
// let q = "INSERT INTO users (id, username, email, avatar, password) VALUES ?"


// const users = [];
// for (let i = 0; i < 100; i++) {
//   users.push(createRandomUser());
// }

// try{
// connection.query(q,[users] , (err, results) => {
//   if (err) {
//     console.error("Error fetching tables:", err);
//     throw err;
//   }
//   console.log("Tables in the database:", results);
// });
// } catch (err) {
// console.error("Error occurred while fetching tables:", err);
// }


// try{
// connection.query("SELECT * FROM users", (err, results) => {
//   if (err) {
//     console.error("Error fetching tables:", err);
//     throw err;
//   }
//   console.log("Tables in the database:", results);
// });
// } catch (err) {
// console.error("Error occurred while fetching tables:", err);
// }
 
const sqlconnection = (query, callback, res) => {
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).send("Internal Server Error");
        }
        console.log("Query executed successfully");
        callback(results);
    });
};

app.get('/', (req, res) => {
    const q = "SELECT COUNT(*) AS count FROM users";

    const response = (results) => {
        const count = results[0].count; // extract count from query result
        res.render('index', { userCount: count });
    };

    sqlconnection(q, response, res);
});


app.get('/users', (req, res) => {
    let q = "SELECT * FROM users";
    const response = (results) => {
        res.render('users', { users: results });
    };

    sqlconnection(q, response, res);
});

app.get('/users/:id/edit',(req,res) => {
    const userId = req.params.id;
    let q = `SELECT * FROM users WHERE id = '${userId}'`;
    const response = (results) => {
        if (results.length > 0) {
            console.dir(results[0])
            res.render('edit', { user: results[0] });
        } else {
            res.status(404).send("User not found");
        }
    };

    sqlconnection(q, response, res);
});

app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, avatar } = req.body;

    let q = `UPDATE users SET username = '${username}', email = '${email}', avatar = '${avatar}' WHERE id = '${userId}'`;

    const response = (results) => {
        res.redirect('/users');
    };

    sqlconnection(q, response, res);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    let q = `DELETE FROM users WHERE id = '${userId}'`;

    const response = (results) => {
        res.redirect('/users');
    };

    sqlconnection(q, response, res);
});

app.get('/users/new', (req, res) => {
    res.render('addUser');
});

app.post('/users', (req, res) => {
    const { username, email, avatar, password } = req.body;

    let q = `INSERT INTO users (username, email, avatar, password) VALUES ('${username}', '${email}', '${avatar}', '${password}')`;

    const response = (results) => {
        res.redirect('/users');
    };

    sqlconnection(q, response, res);
});