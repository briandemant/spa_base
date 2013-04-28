// https://github.com/testacular/testacular/wiki/Configuration-File-Overview 
basePath = '../../';
  
files = [
	JASMINE,
	JASMINE_ADAPTER,
	'app/vendor/angular/angular.js',
	'app/vendor/angular/angular-*.js', 
	'app/js/**/*.js',
	'app/test/unit/**/*.js'
];

exclude = [
	'app/vendor/angular/angular-scenario.js'
];

autoWatch = true;

//browsers = ['Chrome','ChromeCanary','Firefox','Opera','Safari','PhantomJS'];
browsers = ['Chrome']; 

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
reporters = ['progress'];

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500; 

//junitReporter = {
//  outputFile: 'test_out/unit.xml',
//  suite: 'unit'
//};
