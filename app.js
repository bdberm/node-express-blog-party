const process = require('dotenv').config();

const express = require('express');
//logging
const morgan = require('morgan');

//File System
const fs = require('fs');

const app = express();




// LOGGING
app.use(morgan('combined'));

// For servinc static files like CSS and JS
app.use(express.static('assets'));


app.set('view engine', 'pug');
app.set('views', 'views');

// app.get("/", (req, res) => res.render('index',{subHeadVariable: "subhead from var"}));
app.get("/", (req, res) => {
  const dogs = fs.readFileSync('db/dog_seeds.json', 'utf-8');
  const dogArr = JSON.parse(dogs);

  res.render('index',{subHeadVariable: "subhead from var", dogArr: dogArr});
});


app.listen(3000, () => console.log('listening on port 3000'));
