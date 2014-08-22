/* global module: false */
module.exports = function(grunt) {

  function prepend(pre) {
    return function(acc, el) {
      acc.push(pre + el);
      return acc;
    };
  }

  function prependEach(arr, pre) {
    return arr.reduce(prepend(pre), []);
  }

  var bowerDirs = {
    copy: 'bower_components/',
    uglify: '../public/src/bower_components/'
  },
    bowerFiles = [
      // First, because it's jQuery
      // Also, isotope should attach itself to $.fn
      // Via bridget, so bridget is the first file included
      'jquery/dist/jquery.js',

      'fastclick/lib/fastclick.js',

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
      'foundation/js/foundation/foundation.tab.js',
      'foundation/js/foundation/foundation.topbar.js',
      'foundation/js/foundation/foundation.abide.js',
      'foundation/js/foundation/foundation.reveal.js',
      'foundation/js/foundation/foundation.alert.js',
      'foundation/js/foundation/foundation.magellan.js',
      'foundation/js/foundation/foundation.clearing.js',
      'jquery.lazyload/jquery.lazyload.min.js',
      'select2/select2.js',
      'jquery-cookie/jquery.cookie.js'
    ],
    myDirs = {
      copy: 'js/',
      uglify: '../public/src/js/'
    },
    myFiles = [
      // 'jquery.loupe.js',
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
    return prependEach(bowerFiles, bowerDirs[type]).concat(prependEach(myFiles, myDirs[type]));
  }

  var copySrc = makeDirs('copy');

  var uglifySrc = makeDirs('uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dev: {
        files: [
          {
            src: copySrc,
            dest: '../public/src/'
          },
          {
            src: 'bower_components/modernizr/modernizr.custom.min.js',
            dest: '../public/js/modernizr.js'
          }
        ]
      }
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true,
          mangle: false,
          preserveComments: 'all'
        },
        files: [{
          src: uglifySrc,
          dest: '../public/js/app.dev.js'
        }]
      },
      dist: {
        options: {
          banner: '/*! All other assets (c) Gale Diamonds Chicago <%= grunt.template.today("yyyy-mm-dd") %>*/',
          sourceMap: false,
          mangle: true,
          preserveComments: false
        },
        files: [{
          src: uglifySrc,
          dest: '../public/src/min/build.js'
        }]
      },
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dev: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          '../public/css/app.dev.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          banner: '/*! All other assets (c) Gale Diamonds Chicago <%= grunt.template.today("yyyy-mm-dd") %>*/',
          outputStyle: 'compressed',
        },
        files: {
          '../public/src/min/build.css': 'scss/app.scss'
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
        tasks: ['sass:dev'],
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

  grunt.registerTask('dist', ['copy:dev', 'sass:dist', 'uglify:dist']);
  grunt.registerTask('build', ['copy:dev', 'sass:dev', 'uglify:dev']);
  grunt.registerTask('default', ['build', 'watch']);
};
