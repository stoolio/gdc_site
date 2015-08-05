var thumbClick = function(e) {
  e.preventDefault();

  var $this = $(this),
    largeSrc = $this.attr('href'),
    $imgContainer = $('.ring-large'),
    $img = $imgContainer.children('img');

  function imgFadeIn() {
    $img.fadeIn("50", function(){
      $imgContainer.height("");
    });
  }

  function onLoad() {
    $this.data('loaded', true);
    imgFadeIn();
  }

  if(largeSrc === $img.attr('src')) return;

  if($this.data('loaded')) {
    $img.fadeOut('50', function() {
      $img.attr('src', largeSrc);
      imgFadeIn();
    });
  } else {
    $imgContainer.height($img.height());

    $img.fadeOut("50", function() {
      $img.attr('src', largeSrc);
      $img.on('load', onLoad);
    });
  }
};
