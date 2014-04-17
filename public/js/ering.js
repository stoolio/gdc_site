/* global $:   false */
/* global document: false */
/* global window:   false */
/* global console:  false */
/* global Foundation: false */
$(document).ready(function () {
  "use strict";

  var $win = $(window),
      $imgs = $('img.lazy'),                      // images for lazy loading
      $container = $('.engagement-ring-archive'), // isotope container
      $filters = $('.filters'),                   // filter container
      filters = {},                               // saves selected filters
      setCellSize,
      cellSize,
      $sorts = $('.sorts');

  // Sets cellSize variable and creates a function for use later
  (setCellSize = function () {
    cellSize = $win.width() < 720 ? 210 : 310;
  })();

  $.fn.trueData = function (dataAttrib) {
    return $(this).data(dataAttrib) == '';
  };

  $win.resize(Foundation.utils.debounce(function () {
    setCellSize();

    $container.isotope({
      cellsByRow: {
        columnWidth : cellSize + 20,
        rowHeight   : cellSize + 40
      }
    }).isotope('layout');

  }, 300));


  $imgs.show().lazyload({
    effect : 'fadeIn',
    // Images may not appear in their html order, so we must check them all
    failure_limit : Math.max($imgs.length - 1, 0),
    // Loads images 50px outside of viewport
    threshold : 50,
  });

  $container.isotope({
    itemSelector: '.engagement-ring',
    getSortData: {
      price: '[data-price]'
    },
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth : cellSize + 20,
      rowHeight   : cellSize + 40
    }
  }).imagesLoaded( function () {
    $container.isotope('layout');
  });

  $container.isotope('on', 'layoutComplete', function () {
    // Scroll event triggers lazyload check
    $win.trigger('scroll');
  });

  // The appear event is fired whenever lazyload loads a new image. Since:
  // 1. There are multiple images in a row
  //    user scrolls->multiple images appear->we only want to layout once
  // 2. layoutComplete triggers a scroll
  //    scroll could trigger appear->layout->layoutComplete->scroll
  //    aka infinite recursion
  // To solve our problem we debounce this function.
  // In short, this ensures the browser doesn't go crazy (infinite recursion),
  // all visible images are loaded, and the layout is clean.
  // $container.on('appear', Foundation.utils.debounce(function () {
  //   $container.imagesLoaded()
  //     .always(function () {
  //       $container.isotope('layout');
  //       //console.log('Debounced appear on image load');
  //     });
  //     .progress(function (instance, image) {
  //       console.log('image: ' + image.img.src);
  //     });
  // }, 300));

  $sorts.on('click', 'dd', function(e) {
    e.preventDefault();

    var $this = $(this),
        $group = $this.parents('dl'),
        sortBy = $this.trueData('reset-sort') ? '' : $group.data('sort-by'),
        sortDir = $this.trueData('sort-desc') ? false : true;

    $group.find('.active').removeClass('active');
    $this.addClass('active');

    $container.isotope({
      sortBy: sortBy,
      sortAscending: sortDir
    });
  });

  $filters.on('click', 'dd', function (e) {
    e.preventDefault();

    var $this = $(this),
        $group = $this.parents('dl'),             // clicked object group
        selector = $this.data('filter'),
        group = $group.data('filter-group'),      // filter group name
        filter = '',                              // iterator for groups
        isoFilter = '';                           // collects all filters
                        

    if ($this.hasClass('active')) {

      $this.removeClass('active');
      filters[group] = '';

    } else {

      $group.find('.active').removeClass('active');
      $this.addClass('active');

      filters[group] = selector;

    }

    for (filter in filters) {
      isoFilter += filters[filter];
    }

    $container.isotope({filter: isoFilter});
  });
});
