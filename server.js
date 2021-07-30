const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { data } = require('./data/db');



app.get('/api/db', (req, res) => {
    res.json(data);
  });


  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });