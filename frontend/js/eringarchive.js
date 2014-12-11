var EngagementRingArchive = (function(buildPinButton, IsotopeLayout, Filterer, Sorter) {

  function initPin(elements_left, settings) {
    $parent = $(this).parents('article');
    buildPinButton($parent);
  }

  function EngagementRingArchive() {
    this.$imgs = $('img.lazy');
    this.isotopeLayout = new IsotopeLayout('#engagement-ring-archive', '.engagement-ring', window);

    this.filters = new Filterer('.filters', 'dd', this.isotopeLayout);
    this.sorts = new Sorter('.sorts', 'dd', this.isotopeLayout);

    // add .show() and noscript tags for no js support
    this.$imgs.lazyload({
      effect : 'fadeIn',
      failure_limit : Math.max(this.$imgs.length - 1, 0),
      threshold : 20,
      appear: initPin
    });

    this.isotopeLayout.initialize({
      getSortData: {
        price: '[data-price]'
      }
    }, { filter: this.filters.update.bind(this.filters), sort: this.sorts.update.bind(this.sorts) });
  }

  return EngagementRingArchive;

}(window.buildPinButton, IsotopeLayout, Filterer, Sorter));
