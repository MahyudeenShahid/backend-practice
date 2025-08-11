const express = require('express');
const Path = require('path');
const {v4: uuidv4}= require('uuid');
var methodOverride = require('method-override')


const app = express();
let port = 3000;
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: uuidv4(), username: 'alice', content: 'Hello from Alice!' },
  { id: uuidv4(), username: 'bob', content: 'Bob loves coding.' },
  { id: uuidv4(), username: 'charlie', content: 'Charlie is learning Express.' },
  { id: uuidv4(), username: 'dave', content: 'Dave enjoys backend development.' },
  { id: uuidv4(), username: 'eve', content: 'Eve likes JavaScript.' },
  { id: uuidv4(), username: 'frank', content: 'Frank is building a website.' },
  { id: uuidv4(), username: 'grace', content: 'Grace writes tutorials.' },
  { id: uuidv4(), username: 'heidi', content: 'Heidi is testing APIs.' },
  { id: uuidv4(), username: 'ivan', content: 'Ivan is debugging code.' },
  { id: uuidv4(), username: 'judy', content: 'Judy is designing UI.' }
];




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Press Ctrl+C to stop the server`);
  console.log(uuidv4());
});

app.get('/posts', (req, res) => {
    console.log(`Received request to my server`);
    res.render('index', { users: users });
});

app.get('/posts/new', (req, res) => {
    console.log(`Received request to /posts/new`);
  res.render('new');
});

app.get('/posts/:id/edit', (req, res) => {
   const userid =req.params.id;
  const user = users.find((p)=>userid===p.id);
  console.log(user)
  if (user) {
      res.render('edit',{user})
  } else {
      res.render('posterror');
  }
});

app.patch('/posts/:id', (req, res) => {
    console.log(`Received request to /posts/${req.params.id}`);
    const { content } = req.body;
    const user = users.find((p) => p.id === req.params.id);
    console.log(user);
    if (user) {
        user.content = content;
        res.redirect('/posts');
    } else {
        res.render('posterror');
    }
});

app.post('/posts', (req, res) => {
    console.log(`Received request to /posts`);
    const { username, content } = req.body;
    users.push({ id: uuidv4(), username, content });
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
  const userid =req.params.id;
  const user = users.find((p)=>userid===p.id);
  console.log(user)
  if (user) {
      res.render('post',{user})
  } else {
      res.render('posterror');
  }
})



app.get('/contact', (req, res) => {
    console.log(`Received request to /contact`);
  res.send('<h1>Contact</h1><p>This is the contact page.</p>');
});

app.get('/services', (req, res) => {
    console.log(`Received request to /services`);
  res.send('<h1>Services</h1><p>This is the services page.</p>');
});

// Optional: Middleware to log every request
// app.get('/*', (req, res) => {
//     console.log(`Received request`);
//     res.send('<h1>404 Not Found</h1><p>The requested resource was not found.</p>');
// });

app.get('/search', (req, res) => {
  console.log(`Received request to /search`);

  const query = req.query;
  console.log(query);
const q = JSON.stringify(query);
  console.log(q);

  res.send(`<h1>Search Term: ${q}</h1><p>This is the search page.</p>`);
});

app.get('/search/:term', (req, res) => {
  console.log(`Received request to /search/:term`); 
    const term = req.params;
    console.log(term);
    res.send(`<h1>Search Term: ${JSON.stringify(term)}</h1><p>This is the search page for term: ${JSON.stringify(term)}</p>`);
});
// Uncomment the following lines to log every request



app.delete('/posts/:id', (req, res) => {
  console.log(`Received request to DELETE /posts/${req.params.id}`);
  const userid=req.params.id;
  console.log(userid);
  users = users.filter((p) => p.id !== userid);
  res.redirect('/posts');
});
app.use((req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
  res.send('Hello World! ');
});
