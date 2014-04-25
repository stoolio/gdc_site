/* jshint curly: true */
/* global $ */
/* global $:          false */
/* global document:   false */
/* global window:     false */
/* global Foundation: false */
$(document).ready(function () {
  "use strict";

  var $win = $(window),
      $imgs = $('img.lazy'),                      // images for lazy loading
      $container = $('#engagement-ring-archive'), // isotope container
      itemSelector = '.engagement-ring',
      $filters = $('.filters'),                   // filter container
      filters = {},                               // saves selected filters
      // cellSize,
      $sorts = $('.sorts');

  // function setCellSize () {
  //   cellSize = $win.width() < 720 ? 210 : 310;
  // }

  // setCellSize();

  $.fn.trueData = function (dataAttrib) {
    return $(this).data(dataAttrib) === '';
  };

  // $win.resize(Foundation.utils.debounce(function () {
  //   setCellSize();

  //   $container.isotope({
  //     cellsByRow: {
  //       columnWidth : cellSize + 20,
  //       rowHeight   : cellSize + 40
  //     }
  //   }).isotope('layout');

  // }, 300));


  // .show() for no js support
  $imgs.lazyload({
    effect : 'fadeIn',
    failure_limit : Math.max($imgs.length - 1, 0),
    threshold : 20,
  });

  $container.isotope({
    itemSelector: itemSelector,
    getSortData: {
      price: '[data-price]'
    },
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth : itemSelector,
      rowHeight   : itemSelector
    },
    hiddenStyle: {
      opacity: 0
    },
    visibleStyle: {
      opacity: 1
    }
  });

  $container.isotope('on', 'layoutComplete', function () {
    // Scroll event triggers lazyload check
    // console.log('layoutComplete: triggering scroll');
    setTimeout(function() {
      $win.trigger('scroll');
    }, 100);
  });

  // $container.on('appear', Foundation.utils.debounce(function () {
  //   $container.imagesLoaded()
  //     .always(function () {
  //       $container.isotope('layout');
  //     });
  // }, 500));

  $sorts.on('click', 'dd', function(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),
      sortBy = '',
      sortDir = true;

    if ($this.trueData('reset-sort') || $this.hasClass('active')) {
      $group.find('.active').removeClass('active');
    } else {
      $group.find('.active').removeClass('active');
      $this.addClass('active');
      sortBy = $group.data('sort-by');
      sortDir = $this.trueData('sort-desc') ? false : true;
    }

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
