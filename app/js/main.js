'use strict';

// create the app
var spaApp = angular.module('SpaApp', []);

spaApp.config(['$routeProvider', function ($routeProvider) {
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
}]);


