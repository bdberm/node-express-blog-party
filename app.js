// const process = require('dotenv').config();

const express = require('express');
//logging
const morgan = require('morgan');

//File System
const fs = require('fs');

//random ID generator
const uuidv4 = require('uuid/v4');

// Parse Create and Edit Forms
const bodyParser = require('body-parser');

//For Patch and Delete Requests
const methodOverride = require('method-override');

const app = express();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// LOGGING
app.use(morgan('combined'));

// For servinc static files like CSS and JS
app.use(express.static('assets'));

//Method override with query value
app.use(methodOverride('_method'));


app.set('view engine', 'pug');
app.set('views', 'views');

// app.get("/", (req, res) => res.render('index',{subHeadVariable: "subhead from var"}));
app.get("/", (req, res) => {

  // const dogArr = Object.keys(dogs).map((key) => dogs[key]);
  const dogsFile = fs.readFileSync('./db/dog_seeds.json', 'utf-8');
  const dogArr = JSON.parse(dogsFile);

  res.render('index',{subHeadVariable: "subhead from var", dogArr: dogArr});
});

app.get("/new", (req, res) => {
  res.render('new');
});

app.get("/:dogId", (req, res) => {
  // const dog = dogs[req.params.dogId];
  const dogs = JSON.parse(fs.readFileSync('./db/dog_seeds.json', 'utf-8'));
  const dog = dogs[req.params.dogId];

  if (dog) {
    res.render('show',{dog: dog});
  } else {
    res.status(404).end("No such dog");
  }
});

app.get("/:dogId/edit", (req, res) => {
  const dogs = JSON.parse(fs.readFileSync('./db/dog_seeds.json', 'utf-8'));
  const dog = dogs[req.params.dogId];

  if (dog) {
    console.log(dog);
    res.render("edit", {dog: dog});
  } else {
    res.status(404).end("No such dog");
  }
});

app.post("/", urlencodedParser, (req, res) => {
  const dogs = JSON.parse(fs.readFileSync('./db/dog_seeds.json', 'utf-8'));
  const newId = uuidv4();
  const newDog = {
    id: newId,
    name: req.body.name || 'unknown',
    breed: req.body.breed || 'unknown',
    owner: req.body.owner || 'unknown'
  };

  dogs[newId] = newDog;

  fs.writeFileSync('./db/dog_seeds.json', JSON.stringify(dogs, null, 2));
  res.redirect(303, "/");
});

app.patch("/:dogId", urlencodedParser, (req, res) => {
  const dogs = JSON.parse(fs.readFileSync('./db/dog_seeds.json', 'utf-8'));
  const dog = dogs[req.params.dogId];
  const {name, breed, owner} = req.body;
  const updatedDog = Object.assign({}, dog, {name, breed, owner} );
  dogs[req.params.dogId] = updatedDog;
  fs.writeFileSync('./db/dog_seeds.json', JSON.stringify(dogs, null, 2));
  res.redirect(303, "/" + req.params.dogId);
});

app.delete("/:dogId", urlencodedParser, (req, res) => {
  const dogs = JSON.parse(fs.readFileSync('./db/dog_seeds.json', 'utf-8'));
  delete dogs[req.params.dogId];
  fs.writeFileSync('./db/dog_seeds.json', JSON.stringify(dogs, null, 2));
  res.redirect(303, "/");
});




app.listen(3000, () => console.log('listening on port 3000'));
