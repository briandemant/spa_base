'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var backend = require('./srv/develop.js');
var jshintrc = JSON.parse(require('fs').readFileSync('.jshintrc'));


var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable pathsn
	var yeomanConfig = {
		app : 'app',
		srv : 'srv',
		dist: 'public',
		tmp : '.tmp'
	};

	// combinations
	var combinations = {
		'app.js'      : [
			'<%= yeoman.app %>/js/{,*/}*.js'
		],
		'head.js'     : [
			'<%= yeoman.app %>/components/modernizr/modernizr.js'
		],
		'ie.js'       : [
			'<%= yeoman.app %>/components/es5-shim/es5-shim.js',
			'<%= yeoman.app %>/components/json3/lib/json3.min.js'
		],
		'angular.js'  : [
			'<%= yeoman.app %>/components/angular/angular.js',
			'<%= yeoman.app %>/angular-resource/angular-resource.js',
			'<%= yeoman.app %>/angular-cookies/angular-cookies.js',
			'<%= yeoman.app %>/angular-sanitize/angular-sanitize.js'
		],
		'bootstrap.js': [
			'<%= yeoman.app %>/components/jquery/jquery.min.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-affix.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-alert.js',
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-button.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-carousel.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-collapse.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-dropdown.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-modal.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-tooltip.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-popover.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-scrollspy.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-tab.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-transition.js' ,
			'<%= yeoman.app %>/components/bootstrap/js/bootstrap-typeahead.js'
		]
	};

	try {
		yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
	} catch (e) {}

	grunt.initConfig(
			{
				yeoman: yeomanConfig,

				watch: {
					less      : {
						files: ['<%= yeoman.app %>/less/{,*/}*.less'],
						tasks: ['less:dev', 'livereload']
					},
					srv       : {
						files: ['<%= yeoman.srv %>/{,*/}*.js'],
						tasks: ['backend-livereload']
					},
					livereload: {
						files: [
							'<%= yeoman.app %>/{,*/}*.html',
							'{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
							'{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
							'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
						],
						tasks: [ 'livereload', 'jshint:dev']
					}
				},

				connect: {
					options   : {
						port    : 9000, 
						hostname: '0.0.0.0'
					},
					livereload: {
						options: {
							middleware: function (connect) {
								return [
									lrSnippet,
									mountFolder(connect, yeomanConfig.tmp), 
									mountFolder(connect, yeomanConfig.app),
									backend.proxy
								];
							}
						}
					},
					test      : {
						options: {
							middleware: function (connect) {
								return [
									mountFolder(connect, yeomanConfig.tmp),
									mountFolder(connect, 'test')
								];
							}
						}
					}
				},

				open: {
					server: {
						url: 'http://localhost:<%= connect.options.port %>'
					}
				},

				clean: {
					dist: {
						files: [
							{
								dot: true,
								src: [
									'<%= yeoman.tmp %>/*',
									'<%= yeoman.dist %>/*',
									'!<%= yeoman.dist %>/.git*'
								]
							}
						]
					},
					dev : yeomanConfig.tmp
				},

				jshint: {
					options: jshintrc,
					all    : {
						options: {
							"force": false
						},
						files  : {
							src: ['Gruntfile.js', '<%= yeoman.app %>/js/{,*/}*.js' ]
						}
					},
					dev    : {
						options: {
							"force": true
						},
						files  : {
							src: [ '<%= yeoman.app %>/js/{,*/}*.js' ]
						}
					}
				},

				karma: {
					unit: {
						configFile: 'bin/testconf/karma.conf.js',
						singleRun : true
					}
				},

				less: {
					dev : {
						options: {
							paths          : ['<%= yeoman.app %>/less'],
							dumpLineNumbers: true
						},
						files  : {
							'.tmp/css/minimal.css': '<%= yeoman.app %>/less/minimal.less',
							'.tmp/css/style.css'  : '<%= yeoman.app %>/less/style.less'
						}
					},
					dist: {
						options: {
							paths       : ['<%= yeoman.app %>/less'],
							yuicompress : true,
							optimization: 1
						},
						files  : {
							'<%= yeoman.dist %>/css/minimal.css': '<%= yeoman.app %>/less/minimal.less',
							'<%= yeoman.dist %>/css/style.css'  : '<%= yeoman.app %>/less/style.less'
						}
					}
				},

				concat: {
					dev : {
						files: {
							'<%= yeoman.tmp %>/js/app.js': combinations['app.js'],
							'<%= yeoman.tmp %>/js/head.js': combinations['head.js'],
							'<%= yeoman.tmp %>/js/ie.js': combinations['ie.js'],
							'<%= yeoman.tmp %>/js/angular.js': combinations['angular.js'],
							'<%= yeoman.tmp %>/js/bootstrap.js': combinations['bootstrap.js']
						}
					},
					dist: {
						files: {
							'<%= yeoman.dist %>/js/app.js'      : combinations['app.js'],
							'<%= yeoman.dist %>/js/head.js'     : combinations['head.js'],
							'<%= yeoman.dist %>/js/ie.js'       : combinations['ie.js'],
							'<%= yeoman.dist %>/js/angular.js'  : combinations['angular.js'],
							'<%= yeoman.dist %>/js/bootstrap.js': combinations['bootstrap.js']
						}
					}
				},

				useminPrepare: {
					html   : '<%= yeoman.app %>/prepare.html',
					options: {
						dest: '<%= yeoman.dist %>'
					}
				},

				usemin: {
					html   : ['<%= yeoman.dist %>/{,*/}*.html'],
					css    : ['<%= yeoman.dist %>/css/{,*/}*.css'],
					options: {
						dirs: ['<%= yeoman.dist %>']
					}
				},

				imagemin: {
					dist: {
						files: [
							{
								expand: true,
								cwd   : '<%= yeoman.app %>/images',
								src   : '{,*/}*.{png,jpg,jpeg}',
								dest  : '<%= yeoman.dist %>/images'
							}
						]
					}
				},

				cssmin: {
					dist: {
						files: {
							'<%= yeoman.dist %>/css/style.css': [
								'<%= yeoman.tmp %>/css/{,*/}*.css',
								'<%= yeoman.app %>/css/{,*/}*.css'
							]
						}
					}
				},

				htmlmin: {
					dist: {
						options: {
							removeCommentsFromCDATA  : true,
							// https://github.com/yeoman/grunt-usemin/issues/44
							//collapseWhitespace: true,
							collapseBooleanAttributes: true,
							//removeAttributeQuotes: true,
							removeRedundantAttributes: true,
							useShortDoctype          : true,
							removeEmptyAttributes    : true,
							//removeOptionalTags: true
						},
						files  : [
							{
								expand: true,
								cwd   : '<%= yeoman.app %>',
								src   : ['*.html', 'views/*.html'],
								dest  : '<%= yeoman.dist %>'
							}
						]
					}
				},

				cdnify: {
					dist: {
						html: ['<%= yeoman.dist %>/{,*/}*.html']
					}
				},

				ngmin: {
					dist: {
						files: [
							{
								expand: true,
								cwd   : '<%= yeoman.dist %>/js',
								src   : '*.js',
								dest  : '<%= yeoman.dist %>/js'
							}
						]
					}
				},

				uglify: {
					dist: {
						files: {
							'<%= yeoman.dist %>/js/head.js': [
								'<%= yeoman.dist %>/js/head.js'
							]
						}
					}
				},

				rev: {
					dist: {
						files: {
							src: [
								'<%= yeoman.dist %>/js/{,*/}*.js',
								'<%= yeoman.dist %>/css/{,*/}*.css',
								'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
								'<%= yeoman.dist %>/css/fonts/*'
							]
						}
					}
				},

				copy: {
					dist: {
						files: [
							{
								expand: true,
								dot   : true,
								cwd   : '<%= yeoman.app %>',
								dest  : '<%= yeoman.dist %>',
								src   : [
									'*.{ico,txt}',
									'.htaccess',
									'components/**/*',
									'partials/**/*',
									'images/{,*/}*.{gif,webp,png,jpg}',
									'css/fonts/*'
								]
							}
						]
					}
				}
			});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('develop', [
		'clean:dev',
		'less:dev',
		'concat',
		'livereload-start',
		'connect:livereload',
		//'open',
		'watch'
	]);

	grunt.registerTask('test', [
		'clean:dev',
		'less:dev',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'jshint:all',
		//'test',
		'less:dist',
		'useminPrepare',
		'imagemin',
		'cssmin',
		'htmlmin',
		'concat',
		'copy',
		'cdnify',
		'ngmin',
		'uglify',
		'rev'
		// 'usemin'
	]);

	grunt.registerTask('build:js', [
		'clean:dist',
		'jshint:dev',
		'useminPrepare',
		'concat',
		'ngmin',
		'uglify',
		'rev'
	]);

	grunt.registerTask('backend-livereload', 'backend livereload', function () {
		var done = this.async();
		backend.reload(function () {
			grunt.task.run('livereload');
			done();
		});
	});

	grunt.registerTask('default', ['develop']);

};
