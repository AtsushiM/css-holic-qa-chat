// Gruntfile
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                files: {
                    'htdocs/public/javascripts/main.js': [
                        'htdocs/public/javascripts/src/namespace.js',
                        'htdocs/public/javascripts/src/util.js',
                        'htdocs/public/javascripts/src/collections.js',
                        'htdocs/public/javascripts/src/models.js',
                        'htdocs/public/javascripts/src/views.js',
                        'htdocs/public/javascripts/src/main.js'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'htdocs/public/javascripts/main.min.js': [
                        'htdocs/public/javascripts/main.js'
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
