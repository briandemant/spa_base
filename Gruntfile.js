'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var backend = require('./srv/develop.js');
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
		dist: 'public'
	};

	try {
		yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
	} catch (e) {}
 
	grunt.initConfig(
			{
				yeoman       : yeomanConfig,
				
				watch        : {
					less      : {
						files: ['<%= yeoman.app %>/less/{,*/}*.less'],
						tasks: ['less']
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
						tasks: ['livereload']
					}
				},
				
				connect      : {
					options   : {
						port    : 9000,
						// Change this to '0.0.0.0' to access the server from outside.
						hostname: 'localhost'
					},
					livereload: {
						options: {
							middleware: function (connect) {
								return [
									lrSnippet,
									mountFolder(connect, '.tmp'),
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
									mountFolder(connect, '.tmp'),
									mountFolder(connect, 'test')
								];
							}
						}
					}
				},
				
				open         : {
					server: {
						url: 'http://localhost:<%= connect.options.port %>'
					}
				},
				
				clean        : {
					dist  : {
						files: [
							{
								dot: true,
								src: [
									'.tmp',
									'<%= yeoman.dist %>/*',
									'!<%= yeoman.dist %>/.git*'
								]
							}
						]
					},
					dev: '.tmp'
				},
				
				jshint       : {
					options: {
						jshintrc: '.jshintrc'
					},
					all    : [
						'Gruntfile.js',
						'<%= yeoman.app %>/js/{,*/}*.js'
					]
				},
				
				karma        : {
					unit: {
						configFile: 'bin/testconf/karma.conf.js',
						singleRun : true
					}
				},
				
				less         : {
					dev : {
						options: {
							paths          : ['<%= yeoman.app %>/less'],
							dumpLineNumbers: true,
						},
						files  : {
							'.tmp/css/style.css': '<%= yeoman.app %>/less/style.less' 
						}
					},
					dist: {
						options: {
							paths       : ['<%= yeoman.app %>/less'],
							yuicompress : true,
							optimization: 1
						},
						files  : {
							'<%= yeoman.dist %>/css/style.css': '<%= yeoman.app %>/less/style.less'
						}
					}
				},
				
				concat       : {
					dist: {
						files: {
							'<%= yeoman.dist %>/js/combined.js': [
								'.tmp/js/{,*/}*.js',
								'<%= yeoman.app %>/js/{,*/}*.js'
							]
						}
					}
				},
				
				useminPrepare: {
					html   : '<%= yeoman.app %>/index.html',
					options: {
						dest: '<%= yeoman.dist %>'
					}
				},
				
				usemin       : {
					html   : ['<%= yeoman.dist %>/{,*/}*.html'],
					css    : ['<%= yeoman.dist %>/css/{,*/}*.css'],
					options: {
						dirs: ['<%= yeoman.dist %>']
					}
				},
				
				imagemin     : {
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
				
				cssmin       : {
					dist: {
						files: {
							'<%= yeoman.dist %>/css/style.css': [
								'.tmp/css/{,*/}*.css',
								'<%= yeoman.app %>/css/{,*/}*.css'
							]
						}
					}
				},
				
				htmlmin      : {
					dist: {
						options: {
							/*removeCommentsFromCDATA: true,
							 // https://github.com/yeoman/grunt-usemin/issues/44
							 //collapseWhitespace: true,
							 collapseBooleanAttributes: true,
							 removeAttributeQuotes: true,
							 removeRedundantAttributes: true,
							 useShortDoctype: true,
							 removeEmptyAttributes: true,
							 removeOptionalTags: true*/
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
				
				cdnify       : {
					dist: {
						html: ['<%= yeoman.dist %>/*.html']
					}
				},
				
				ngmin        : {
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
				
				uglify       : {
					dist: {
						files: {
							'<%= yeoman.dist %>/js/combined.js': [
								'<%= yeoman.dist %>/js/combined.js'
							]
						}
					}
				},
				
				rev          : {
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
				
				copy         : {
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
		'less:dist',
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
		'jshint',
		'test',
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
		'rev',
		'usemin'
	]); 
	grunt.registerTask('build:js', [
		'clean:dist',
		'jshint',  
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
