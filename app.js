// const process = require('dotenv').config();

const express = require('express');
//logging
const morgan = require('morgan');

//File System
const fs = require('fs');

const app = express();

const dogs = {
  1: {"id": 1,
    "name": "Lassie",
  "breed": "Collie",
  "owner": "Selena"},
  2: {"id": 2,
  "name": "Alfred",
  "breed": "Basset Hound",
  "owner": "Terry"},
  3: {"id": 3,
  "name": "Homer",
  "breed": "Corgi",
  "owner": "Terry"},
  4: {"id": 4,
  "name": "Felicia",
  "breed": "Boston Terrier",
  "owner": "Doug"}
};




// LOGGING
app.use(morgan('combined'));

// For servinc static files like CSS and JS
app.use(express.static('assets'));


app.set('view engine', 'pug');
app.set('views', 'views');

// app.get("/", (req, res) => res.render('index',{subHeadVariable: "subhead from var"}));
app.get("/", (req, res) => {

  const dogArr = Object.keys(dogs).map((key) => dogs[key]);

  res.render('index',{subHeadVariable: "subhead from var", dogArr: dogArr});
});

app.get("/:dogId", (req, res) => {
  const dog = dogs[req.params.dogId];
  res.render('show',{dog: dog});
  // res.end(req.params.dogId);
});


app.listen(3000, () => console.log('listening on port 3000'));
