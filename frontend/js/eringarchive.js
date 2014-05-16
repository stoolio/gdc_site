var EngagementRingArchive = (function(IsotopeLayout, Filterer, Sorter) {

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
    });

    this.isotopeLayout.initialize({
      getSortData: {
        price: '[data-price]'
      }
    });
  }

  return EngagementRingArchive;

}(IsotopeLayout, Filterer, Sorter));
