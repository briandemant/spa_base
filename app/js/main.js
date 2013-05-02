'use strict';

// create the app
var app = angular.module('SpaApp', []);

app.config(function ($routeProvider) {
	$routeProvider
			.when('/', {
				      templateUrl: 'views/main.html',
				      controller : 'MainCtrl'
			      })
			.when('/view', {
				      templateUrl: 'views/view.html',
				      controller : 'MainCtrl'
			      })
			.otherwise({ redirectTo: '/' });
});


