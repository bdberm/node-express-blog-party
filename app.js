const express = require('express');
//logging
const morgan = require('morgan');

const app = express();


// LOGGING
app.use(morgan('combined'));

app.get("/",(req, res) => res.end('my first express request response cycle!'));

app.listen(3000, () => console.log('listening on port 3000'));
