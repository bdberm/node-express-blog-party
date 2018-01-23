const express = require('express');

const app = express();

app.get("/",(req, res) => res.end('my first express request response cycle!'));

app.listen(3000, () => console.log('listening on port 3000'));
