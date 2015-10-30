var Filterer = (function () {

  var active = {
    shape: '',
    style: ''
  };

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),             // clicked object group
      selector = $this.data('filter'),
      group = $group.data('filter-group');      // filter group name

    $group.find('.active').removeClass('active');

    if ($this.hasClass('active')) {
      active[group] = '';
    } else {
      active[group] = selector;
    }

    $this.addClass('active');
    $('option[data-filter="' + selector + '"]').attr('Selected', true);

    e.data.filter(active);
  }

  function onSelectChange() {
    $that = $(this);
    var filter = $that.find('option:selected').data('filter');
    $that.parent('.filters').find('dd[data-filter="' + filter + '"]').click();
  }

  function Filterer(el, itemEl, filterFn) {
    this.$filters = $(el);
    this.filter = filterFn;
    this.$select = this.$filters.find('select');

    // this.$gdc = {
    //   button: $('dd[data-filter=".gale-diamonds"]'),
    //   select: $('option[data-filter=".gale-diamonds"]'),
    //   collection: $('.gale-diamonds-collections')
    // };
    // this.$sareen = {
    //   button: $('dd[data-filter=".sareen"]'),
    //   select: $('option[data-filter=".sareen"]'),
    //   collection: $('.sareen-collections')
    // };

    this.$filters.on('click', itemEl, {filter: this.filter }, click);
    this.$select.change(onSelectChange);
  }

  return Filterer;
}());
