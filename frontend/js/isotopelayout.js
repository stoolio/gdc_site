var IsotopeLayout = (function(window) {
  var $win = $(window);

  function IsotopeLayout(el, itemEl) {
    this.$win = $win;
    this.$container = $(el);
    this.itemSelector = itemEl;

    var defaults = {
      filter: '.gale-diamonds',
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
      },
      getSortData: {
        price: '[data-price]'
      }
    };

    this.$container.isotope(defaults);
    this.$container.isotope('on', 'layoutComplete', this.layoutComplete.bind(this));
  }

  IsotopeLayout.prototype.filter = function(filters) {
    $('.no-items-available').fadeOut();
    isoFilter = '';
    for (var filter in filters) {
      isoFilter += filters[filter];
    }
    this.$container.isotope({
      filter: isoFilter
    });
  };

  IsotopeLayout.prototype.sort = function(sortBy, sortDir) {
    this.$container.isotope({
      sortBy: sortBy,
      sortAscending: sortDir
    });
  }

  IsotopeLayout.prototype.layoutComplete = function() {
    this.testIfNothing();
    this.$win.trigger('lazyload');
  };

  IsotopeLayout.prototype.testIfNothing = function() {
    nothing = true;

    this.$container.find(this.itemSelector).each(function(index) {
      if($(this).css('display') !== 'none') {
        nothing = false;
        return false;
      }
    });

    if(nothing) {
      $('.no-items-available').fadeIn(500);
    }
  };

  return IsotopeLayout;
}(window));
