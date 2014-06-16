Foundation.global.namespace = '';
$(document).foundation();

$(function() {
  var engagementRingArchive,
    shapeSelector;

  $('.ring-thumbs').doOnce($.fn.on, 'click', 'a', thumbClick);

  if($('#engagement-ring-archive').length) {
    engagementRingArchive = new EngagementRingArchive();
  }

  if($('#shape-selector').length) {
    shapeSelector = new ShapeSelector('#shape-selector');
  }

  $('#state-selector').doOnce($.fn.select2, [{
    placeholder: "Select a State'"
  }]);

  $('form').doOnce($.fn.each, RequestForms.init);

  $('.ring-large img').doOnce($.fn.loupe, {width:200,height:200,method:'hover'});

});
