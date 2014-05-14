$(document).ready(function(){
  "use strict";

  // function initialize() {
  //   var $img = $('.ring-large img'),
  //     largeSrc = $('.ring-thumbs a').first().attr('href');

  //   $img.attr('src', largeSrc);
  //   setTimeout( function() {
  //     $img.fadeIn();
  //   }, 200);
  // }

  // initialize();

  $('.ring-thumbs').on('click', 'a', function(e){
    e.preventDefault();

    var $this = $(this),
      largeSrc = $this.attr('href'),
      $imgContainer = $('.ring-large img')



    $imgContainer.fadeOut( function() {
      $imgContainer.attr('src', largeSrc)
      $imgContainer.fadeIn();
    });
  });
})
