var Sorter = (function () {

  function trueData(el, dataAttrib) {
    return el instanceof jQuery ?
      el.data(dataAttrib) === '' :
      $(el).data(dataAttrib) === '';
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

    e.data.isotopeLayout.sort(sortBy, sortDir);

    // e.data.isotopeLayout.options({
    //   sortBy: sortBy,
    //   sortAscending: sortDir
    // });
  }

  function Sorter(el, itemEl, iso) {
    this.$sorts = $(el);
    this.isotopeLayout = iso;

    this.$sorts.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
  }

  Sorter.prototype.update = function () {
    console.log('updating sorts');

    if(this.isotopeLayout.state.s['by'] === '' ) {
      $('dd[data-sort-asc]').removeClass('active');
      $('dd[data-sort-desc]').removeClass('active');
      return;
    }

    if(this.isotopeLayout.state.s['dir'] === true ) {
      $('dd[data-sort-asc]').addClass('active');
    } else {
      $('dd[data-sort-desc]').addClass('active');
    }
  };

  return Sorter;
}());
