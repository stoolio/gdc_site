/* global module: false */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      vendor: {
        src: [
          'bower_components/modernizr/modernizr.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'bower_components/jquery.lazyload/jquery.lazyload.min.js',
          'bower_components/isotope/dist/isotope.pkgd.min.js',
          'bower_components/isotope-cells-by-row/cells-by-row.js',
          'bower_components/imagesloaded/imagesloaded.js'
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
          outputStyle: 'compressed'
        },
        files: {
          '../public/css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      copy: {
        files: 'js/*',
        tasks: ['copy:app']
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

  grunt.registerTask('build', ['newer:sass','newer:copy']);
  grunt.registerTask('default', ['build','watch']);
}
