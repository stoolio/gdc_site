/* global module: false */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            vendor: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/foundation/js/foundation/*.js',
                    'bower_components/foundation/js/foundation.min.js',
                    'bower_components/jquery.lazyload/jquery.lazyload.js',
                    'bower_components/jquery.lazyload/jquery.lazyload.min.js',
                    'bower_components/isotope/dist/isotope.pkgd.min.js',
                    'bower_components/isotope-cells-by-row/cells-by-row.js',
                    'bower_components/imagesloaded/imagesloaded.js',
                    'bower_components/select2/select2.js',
                    'bower_components/select2/select2.css'
                ],
                dest: '../public/'
            },
            app: {
                src: 'js/*',
                dest: '../public/'
            }
        },

        sass: {
            options: {
                includePaths: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceComments: 'map'
                },
                files: {
                    '../public/css/app.css': 'scss/app.scss'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            copy: {
                files: 'js/*',
                tasks: ['copy:app']
            },
            copy2: {
                files: 'bower_components/**/*.js',
                tasks: ['copy:vendor']
            },
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['newer:sass', 'newer:copy:vendor', 'newer:copy:app']);
    grunt.registerTask('default', ['build', 'watch']);
};
