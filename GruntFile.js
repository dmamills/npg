module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		mochaTest: {
			test: {
				options: {
					reporter:'nyan'
				},
				src:['test/test.js']
			}
		},
		jshint: {
			all: {
				src: [ 'lib/*.js' ]
			}
		},
		watch: {
			files:['test/*.js','lib/*.js'],
			tasks:['mochaTest','jshint']
		}
	});
	
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['mochaTest','jshint','watch']);
};