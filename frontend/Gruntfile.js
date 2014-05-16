/* global module: false */
module.exports = function(grunt) {

  function prependDir(dir) {
    return function(acc, el) {
      acc.push(dir + el);
      return acc;
    };
  }

  function prependEachDir(arr, dir) {
    return arr.reduce(prependDir(dir), []);
  }

  var bowerDirs = {
    copy: 'bower_components/',
    uglify: '../public/src/bower_components/'
  },
    bowerFiles = [
      // First, because it's jQuery
      // Also, isotope should attach itself to $.fn
      'jquery/dist/jquery.js',

      // Secret Depend for Isotope jQuery style
      'jquery-bridget/jquery.bridget.js',

      // Various Isotope
      'eventie/eventie.js',
      'doc-ready/doc-ready.js',
      'eventEmitter/EventEmitter.js',
      'get-style-property/get-style-property.js',
      'get-size/get-size.js',
      'matches-selector/matches-selector.js',
      'outlayer/item.js',
      'outlayer/outlayer.js',

      // Actual Isotope Shit
      'isotope/js/item.js',
      'isotope/js/layout-mode.js',
      'isotope-cells-by-row/cells-by-row.js',
      'isotope/js/isotope.js',

      // Depends jQuery
      'foundation/js/foundation/foundation.js',
      'foundation/js/foundation/foundation.topbar.js',
      'foundation/js/foundation/foundation.abide.js',
      'foundation/js/foundation/foundation.reveal.js',
      'foundation/js/foundation/foundation.magellan.js',
      'jquery.lazyload/jquery.lazyload.min.js',
      //'imagesloaded/imagesloaded.js',
      'select2/select2.js',
    ],
    myDirs = {
      copy: 'js/',
      uglify: '../public/src/js/'
    },
    myFiles = [
      'doonce.js',
      'filterer.js',
      'isotopelayout.js',
      'requestform.js',
      'shapeselector.js',
      'sorter.js',
      'thumbclick.js',
      'eringarchive.js',
      'app.js',
    ];

  function makeDirs(type) {
    return prependEachDir(bowerFiles, bowerDirs[type]).concat(prependEachDir(myFiles, myDirs[type]));
  }

  var copySrc = makeDirs('copy');

  var uglifySrc = makeDirs('uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dev: {
        src: copySrc,
        dest: '../public/src/'
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        mangle: false,
        preserveComments: 'all'
      },
      dev: {
        files: [{
          src: uglifySrc,
          dest: '../public/js/build.js'
        }]
      },
      dist: {
        options: {
          sourceMap: false,
          mangle: true,
          preserveComments: false
        },
        files: [{
          src: uglifySrc,
          dest: '../public/js/build.js'
        }]
      },
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
            outputStyle: 'compressed',
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
        files: [
          'js/*',
          'bower_components/**/*.js'
        ],
        tasks: ['copy:dev']
      },
      uglify: {
        files: '../public/src/**/*.js',
        tasks: ['uglify:dev']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['sass', 'copy', 'uglify:dist']);
  grunt.registerTask('buildOld', ['sass', 'copy:dev', 'uglify:dev']);
  grunt.registerTask('build', ['newer:sass', 'newer:copy:dev', 'newer:uglify:dev']);
  grunt.registerTask('default', ['build', 'watch']);
};
