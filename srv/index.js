var express = require('express');
var app = express();
var server = require('./server');

app.use(server);
var minute = 60 * 1000;
app.use(express.static(__dirname + '/../public', { maxAge: minute }));

app.listen(3000);
console.log('Listening on port 3000');