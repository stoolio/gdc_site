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
      // $group.find('.active').removeClass('active');
    } else {
      // $group.find('.active').removeClass('active');
      // $this.addClass('active');
      sortBy = $group.data('sort-by');
      sortDir = trueData($this, 'sort-desc') ? false : true;
    }

    e.data.isotopeLayout.sort(sortBy, sortDir);

    // e.data.isotopeLayout.options({
    //   sortBy: sortBy,
    //   sortAscending: sortDir
    // });
  }

  function onSelectChange() {
    $that = $(this).find('option:selected');
    if(trueData($that, 'sort-desc')) {
      $('dd[data-sort-desc]').click();
    } else if(trueData($that, 'sort-asc')) {
      $('dd[data-sort-asc]').click();
    } else {
      $('dd[data-reset-sort]').click();
    }
  }

  function Sorter(el, itemEl, iso) {
    this.$sorts = $(el);
    this.isotopeLayout = iso;
    this.$select = this.$sorts.find('select');

    this.$ = {
      button: {
        asc: this.$sorts.find('dd[data-sort-asc]'),
        desc: this.$sorts.find('dd[data-sort-desc]'),
        reset: this.$sorts.find('dd[data-reset-sort]')
      },
      select: {
        asc: this.$select.find('option[data-sort-asc]'),
        desc: this.$select.find('option[data-sort-desc]'),
        none: this.$select.find('option[data-reset-sort]')
      }
    };

    this.$sorts.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
    this.$select.change(onSelectChange);
  }

  Sorter.prototype.update = function () {

    if(this.isotopeLayout.state.s['by'] === '' ) {
      this.$.button.asc.removeClass('active');
      this.$.button.desc.removeClass('active');
      this.$.select.none.attr('Selected', true);
      return;
    }

    this.$sorts.find('.active').removeClass('active');
    if(this.isotopeLayout.state.s['dir'] === true ) {
      this.$.button.asc.addClass('active');
      this.$.select.asc.attr('Selected', true);
    } else {
      this.$.button.desc.addClass('active');
      this.$.select.desc.attr('Selected', true);
    }
  }.bind(this);

  return Sorter;
}());
