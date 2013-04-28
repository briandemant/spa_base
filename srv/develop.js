var http = require('http'),
		httpProxy = require('http-proxy');
 
var proxy = new httpProxy.RoutingProxy(); 

module.exports = {
	proxy : http.createServer(function (req, res) { 
		proxy.proxyRequest(req, res, {
			host: 'localhost',
			port: 3000
		});
	}),
	reload: function (callback) {
		setTimeout(callback, 1000);
	}
};
 
