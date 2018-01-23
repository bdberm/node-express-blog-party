const process = require('dotenv').config();

const express = require('express');
//logging
const morgan = require('morgan');

const app = express();


// LOGGING
app.use(morgan('combined'));

app.set('view engine', 'pug');
app.set('views', 'views');

// app.get("/",(req, res) => res.end('my first express request response cycle!'));
app.get("/", (req, res) => res.render('hello',{subHeadVariable: "subhead from var"}));

app.listen(3000, () => console.log('listening on port 3000'));
