'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('base app', function () {

	beforeEach(function () {
		browser().navigateTo('/index.html');
	});

	describe('main view', function () {
		beforeEach(function () {
			browser().navigateTo('#/');
		});

		it('should automatically redirect to / when location hash/fragment is empty', function () {
			expect(browser().location().url()).toBe("/");
		});

		it('should render view1 when user navigates to /view1', function () {
			expect(element('[ng-view] h1').text()).toMatch("wazzup\\?");
		});
	});
 
	describe('Other view', function () {
		beforeEach(function () {
			browser().navigateTo('#/view');
		});

		it('should automatically redirect to / when location hash/fragment is empty', function () {
			expect(browser().location().url()).toBe("/view");
		});

		it('should render view1 when user navigates to /view1', function () {
			expect(element('[ng-view] h1').text()).toMatch("other view");
		});
	});
});
