var IsotopeLayout = (function(window) {
  var $win = $(window);

  function layoutComplete() {
    // Scroll event triggers lazyload check
    setTimeout(function() {
      $win.trigger('scroll');
    }, 100);
  }

  function IsotopeLayout(el, itemEl) {
    this.$container = $(el);
    this.itemSelector = itemEl;
    // cellSize;
    this.defaults = {
      itemSelector: this.itemSelector,
      layoutMode: 'cellsByRow',
      cellsByRow: {
        columnWidth : this.itemSelector,
        rowHeight   : this.itemSelector
      },
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    };
  }

  IsotopeLayout.prototype.initialize = function(options) {
    var currentOptions = $.extend(this.defaults, options);
    this.$container.isotope(currentOptions);
    this.$container.isotope('on', 'layoutComplete', layoutComplete);
  };

  IsotopeLayout.prototype.options = function(options) {
    this.$container.isotope(options);
  };

  return IsotopeLayout;
}(window));
