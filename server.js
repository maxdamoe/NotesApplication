const express = require('express');
const app = express();
const { data } = require('./data/db');



app.get('/api/db', (req, res) => {
    res.json(data);
  });


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });