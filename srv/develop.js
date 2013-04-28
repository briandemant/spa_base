"use strict";

var http = require('http');
var httpProxy = require('http-proxy');
var request = require('request');

var proxy = new httpProxy.RoutingProxy();
var done = function () {};


function checkAvailability() {
	request('http://localhost:3000', function (error, response) {
		if (!error && ( response.statusCode === 200 || response.statusCode === 404)) {
			done();
		} else {
			setTimeout(checkAvailability, 100);
		}
	})
}

module.exports = {
	proxy : http.createServer(function (req, res) {
		proxy.proxyRequest(req, res, {
			host: 'localhost',
			port: 3000
		});
	}),
	reload: function (callback) {
		done = callback;
		setTimeout(checkAvailability, 500);
	}
};
