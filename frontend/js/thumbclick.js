var thumbClick = function(e) {
  e.preventDefault();

  var $this = $(this),
    largeSrc = $this.attr('href'),
    $imgContainer = $('.ring-large img');



  $imgContainer.fadeOut( function() {
    $imgContainer.attr('src', largeSrc);
    $imgContainer.fadeIn();
  });
};
