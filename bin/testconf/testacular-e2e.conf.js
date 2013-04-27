// https://github.com/testacular/testacular/wiki/Configuration-File-Overview 
basePath = '../../';

files = [
	ANGULAR_SCENARIO,
	ANGULAR_SCENARIO_ADAPTER,
	'app/js/**/*.js',
	'app/test/e2e/**/*.js'
];

autoWatch = true;

//browsers = ['Chrome','ChromeCanary','Firefox','Opera','Safari','PhantomJS'];
browsers = ['Chrome'];

singleRun = false;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;

port=9877
runnerPort = 9101

proxies = {
	'/': 'http://localhost:8081/'
};

//junitReporter = {
//  outputFile: 'test_out/e2e.xml',
//  suite: 'e2e'
//};
