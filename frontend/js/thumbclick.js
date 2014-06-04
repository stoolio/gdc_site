var thumbClick = function(e) {
  e.preventDefault();

  var $this = $(this),
    largeSrc = $this.attr('href'),
    $imgContainer = $('.ring-large img'),
    $loupe = $('.loupe img');


  $imgContainer.height($imgContainer.height());
  $imgContainer.fadeOut( function() {
    $imgContainer.attr('src', largeSrc);
    $loupe.attr('src', largeSrc);
    $imgContainer.fadeIn( function() {
      $imgContainer.height('');
    });
  });
};
