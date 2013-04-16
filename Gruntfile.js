// Gruntfile
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                files: {
                    'htdocs/public/javascripts/src/_concat_js': [
                        'htdocs/public/javascripts/src/main.js'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'htdocs/public/javascripts/main.js': [
                        'htdocs/public/javascripts/src/_concat_js'
                    ]
                }
            }
        },
        watch: {
          files: ['htdocs/public/javascripts/src/**/*.js'],
          tasks: ['concat', 'uglify']
        }
    });

    grunt.registerTask('default', ['concat', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
