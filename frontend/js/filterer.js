var Filterer = (function () {

  var activeFilters = {
    'sar': '',
    'gdc': '',
    'vend': ''
  };

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),             // clicked object group
      selector = $this.data('filter'),
      group = $group.data('filter-group'),      // filter group name
      filter,                                   // iterator for groups
      isoFilter = '';                           // collects all filters

    if ($this.hasClass('active')) {

      if(group === 'ven') return;

      $this.removeClass('active');
      activeFilters[group] = '';

      // if(group === 'vendor') {
      //   $('.gale-diamonds-collections').fadeIn();
      //   $('.sareen-collections').fadeIn();
      // }

    } else {

      $group.find('.active').removeClass('active');
      $this.addClass('active');

      if (selector === '.gale-diamonds') {
        // if no filters are clicked, activeFilters['collection'] would be undefined
        // fixed above by assigning it an empty string to start
        activeFilters['sar'].split(' ').forEach(function(el) {
          $('dd[data-filter="' + el + '"]').removeClass('active');
        });
        activeFilters['sar'] = '';
        $('.sareen-collections').fadeOut(500, function() {
          $('.gale-diamonds-collections').fadeIn(500);
        });
      }

      if (selector === '.sareen') {
        activeFilters['gdc'].split(' ').forEach(function(el) {
          $('dd[data-filter="' + el + '"]').removeClass('active');
        });
        activeFilters['gdc'] = '';
        $('.gale-diamonds-collections').fadeOut(500, function() {
          $('.sareen-collections').fadeIn(500);
        });
      }

      activeFilters[group] = selector;

    }

    e.data.isotopeLayout.filter(activeFilters);
  }

  function Filterer(el, itemEl, iso) {
    this.$filters = $(el);
    this.isotopeLayout = iso;

    this.$filters.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
  }

  Filterer.prototype.update = function () {
    activeFilters = this.isotopeLayout.state.f;

    console.log('updating filters');

    $('.filters dl').find('.active').removeClass('active');

    if(activeFilters['ven'] === '.gale-diamonds') {
      $('dd[data-filter=".gale-diamonds"]').addClass('active');
      $('.gale-diamonds-collections').fadeIn(500);
      $('dd[data-filter="' + activeFilters['gdc'] + '"]').addClass('active');
    } else {
      $('dd[data-filter=".sareen"]').addClass('active');
      $('.sareen-collections').fadeIn(500);
      $('dd[data-filter="' + activeFilters['sar'] + '"]').addClass('active');
    }

    if(activeFilters['sha'] !== '') {
      $('dd[data-filter="' + activeFilters['sha'] + '"]').addClass('active');
    }

  };

  return Filterer;
}());
