'use strict';

// create the app
var baseApp = angular.module('perfectBase', [])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
					.when('/', {
						      templateUrl: 'partials/main.html',
						      controller : 'MainCtrl'
					      })
					.when('/view', {
						      templateUrl: 'partials/view.html',
						      controller : 'MainCtrl'
					      })
					.otherwise({ redirectTo: '/' });
		}]);
 
baseApp.controller('MainCtrl', ['$scope', function ($scope) {
	$scope.foo = 'wazzup';
}]);
