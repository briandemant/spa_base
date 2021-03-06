'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('baseApp'));

	var MainCtrl,
			scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		scope = {};
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach foos to the scope', function () {
		expect(scope.foo).toBe("wazzup");
	}); 
});
