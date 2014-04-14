/* global $:   false */
/* global document: false */
/* global window:   false */
/* global console:  false */
/* global Foundation: false */
$(document).ready(function () {
  "use strict";

  var $win = $(window),         // window object
    $imgs = $('img.lazy'),      // images for lazy loading
    $container = $('.engagement-ring-archive'), // isotope container
    $filters = $('.filters'),   // filter menu
    filters = {},                    // filter classes isotope
    cellSize = $win.width() < 720 ? 210 : 310;

  $win.resize(Foundation.utils.debounce(function () {
    // Debounced to fire on window resize. A standard function would run
    // mutliple times while a user is scrolling. This ensures it runs no
    // more than once every 250ms
    if ($win.width() < 720) {
      cellSize = 210;
    } else {
      cellSize = 310;
    }

    $container.isotope({
      cellsByRow: {
        columnWidth : cellSize,
        rowHeight   : cellSize
      }
    });

    // Relayout due to changed cellSize
    $container.isotope('layout');
  }, 300));

  // The lazy images are hidden via CSS and a standard image is provided via a
  // noscript tag.
  // If js is active, it shows the images and lazy loads them.
  // If js is not active, images stay hidden, and noscript is shown.
  $imgs.show().lazyload({
    effect : 'fadeIn',
    // Filtering may cause images to be displayed non-sequentially. We need
    // lazyload to iterate through all images to ensure all images are loaded.
    failure_limit : Math.max($imgs.length - 1, 0),
    // This loads images when they are 50px outside of viewport.
    // It is mainly necessary because of the isotope layout
    threshold : 50,
  });

  $container.isotope({
    itemSelector: '.engagement-ring',
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth : cellSize,
      rowHeight   : cellSize
    }
  });

  // layoutComplete is triggered upon the first and all subsequent layouts.
  // Filtering shuffles images around, and lazyload won't know about it. The
  // scroll event activates lazyload to check for new images 
  $container.isotope('on', 'layoutComplete', function () {
    $win.trigger('scroll');
    console.log('layoutComplete');
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
  //$container.on('appear', $.debounce(250, function () {
    // $container.imagesLoaded()
    //   .always(function () {
    //     $container.isotope('layout');
    //     //console.log('Debounced appear on image load');
    //   });
      // .progress(function (instance, image) {
      //   console.log('image: ' + image.img.src);
      // });
  //}));

  $filters.on('click', 'a', function () {
    var $this = $(this),                   // clicked object
      $group = $this.parents('dl'),             // clicked object group
      $parent = $this.parents('dd'),
      selector = $parent.attr('data-filter'),
      group = $group.attr('data-filter-group'), // clicked object group name
      isofilter = '',                           // collects filter classnames
      filter = '';                              // iterator for groups

    // If clicking an active filter, disable it and clear out it's group
    if ($parent.hasClass('active')) {

      $parent.removeClass('active');

      filters[group] = '';

    } else { // Otherwise, remove current active filter, add .active to
             // clicked filter, and replace group filter

      $group.find('.active').removeClass('active');
      $parent.addClass('active');

      filters[group] = selector;

    }

    // Iterate through filter groups and collect filters
    for (filter in filters) {
      isofilter += filters[filter];
    }

    $container.isotope({ filter: isofilter });

    // Don't propagate the click event
    return false;
  });

});
