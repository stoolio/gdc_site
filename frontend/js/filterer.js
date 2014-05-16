var Filterer = (function () {

  var activeFilters = {};

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),             // clicked object group
      selector = $this.data('filter'),
      group = $group.data('filter-group'),      // filter group name
      filter,                                   // iterator for groups
      isoFilter = '';                           // collects all filters


    if ($this.hasClass('active')) {

      $this.removeClass('active');
      activeFilters[group] = '';

    } else {

      $group.find('.active').removeClass('active');
      $this.addClass('active');

      activeFilters[group] = selector;

    }

    for (filter in activeFilters) {
      isoFilter += activeFilters[filter];
    }

    e.data.isotopeLayout.options({filter: isoFilter});
  }

  function Filterer(el, itemEl, iso) {
    this.$filters = $(el);
    this.isotopeLayout = iso;

    this.$filters.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
  }

  return Filterer;
}());
