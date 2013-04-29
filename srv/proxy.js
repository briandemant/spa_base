var http = require('http');
var httpProxy = require('http-proxy');
//
// Create your proxy server
//
httpProxy.createServer(80, 'www.dr.dk').listen(3000);