var express = require('express');
var app = express();
var server = require('./server');

app.use(server);


app.listen(3000);
console.log('Listening on port 3000');