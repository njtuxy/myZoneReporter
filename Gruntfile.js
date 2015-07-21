module.exports = function (grunt) {
    grunt.config.init({
 		bower_concat:{
        	all: {
               	 dest: "./lib/bower.js",
               	 cssDest: "./lib/bower.css"
          	}
		}
    });

 	grunt.loadNpmTasks('grunt-bower-concat');
  	grunt.registerTask('default', ['bower_concat']);
}

