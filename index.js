// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

//import package.json
const pack = require('./package');

// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

//endpoint info to return a json
app.get('/info', (req, res) => {
  res.json({ serverName:pack.name, serverVersion:pack.version });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});