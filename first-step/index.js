const express = require('express');
const app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    console.log(`Received request to my server`);
  res.send('<h1>Hello World!</h1><p>Welcome to my first Express app!</p>');
});

app.get('/about', (req, res) => {
    console.log(`Received request to /about`);
  res.send('<h1>About</h1><p>This is the about page.</p>');
});
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
app.use((req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
  res.send('Hello World! ');
});

