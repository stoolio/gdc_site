var ShapeSelector = (function() {

  function click() {
    var $this = $(this),
      name = $this.text().trim(),
      $option = $("#shape-list option:contains('" + name + "')");

    isActive = $option.attr('Selected') ? true : false;
    $this.toggleClass('active');
    $option.attr('Selected', !isActive);
  }

  function ShapeSelector(el) {
    this.el = el;
    this.$this = $(el).on('click', 'li', click);
  }

  return ShapeSelector;
}());
