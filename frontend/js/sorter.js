var Sorter = (function () {

  function trueData(el, dataAttrib) {
    return el instanceof jQuery ?
      el.data(dataAttrib) === '' :
      $(el).data(dataAttrib);
  }

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),
      sortBy = '',
      sortDir = true;

    if (trueData($this, 'reset-sort') || $this.hasClass('active')) {
      $group.find('.active').removeClass('active');
    } else {
      $group.find('.active').removeClass('active');
      $this.addClass('active');
      sortBy = $group.data('sort-by');
      sortDir = trueData($this, 'sort-desc') ? false : true;
    }

    e.data.isotopeLayout.options({
      sortBy: sortBy,
      sortAscending: sortDir
    });
  }

  function Sorter(el, itemEl, iso) {
    this.$sorts = $(el);
    this.isotopeLayout = iso;

    this.$sorts.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
  }

  return Sorter;
}());
