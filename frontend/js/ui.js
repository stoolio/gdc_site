var UIElement = (function() {

  function trueData(el, dataAttrib) {
    return el instanceof jQuery ?
      el.data(dataAttrib) === '' :
      $(el).data(dataAttrib) === '';
  }

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),
      selector = $this.data('filter'),
      group = $group.data('filter-group');


  }

  function onSelectChange() {}

  function UIElement(el, itemEl, iso) {}

  UIElement.prototype.update = function() {};

  return UIElement;

}());
