"use strict";
var express = require('express');
var app = express();

app.use(express.logger('dev'));

app.get('/hello.txt', function (req, res) {
	var body = 'Hello from backend!';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	
	res.end(body);
});

module.exports = app;