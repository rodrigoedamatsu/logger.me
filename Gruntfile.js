module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: {
            src: './src'
        },

        uglify: {
            build: {
                files: {
                    '<%= app.src %>/loggerjs/logger.min.js': ['<%= app.src %>/loggerjs/logger.js']
                }
            }
        }
    });

    grunt.registerTask('build', [
        'uglify:build'
    ]);
};