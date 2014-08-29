var Filterer = (function () {

  var activeFilters = {
    sar: '',
    gdc: '',
    ven: ''
  };

  function click(e) {
    e.preventDefault();

    var $this = $(this),
      $group = $this.parents('dl'),             // clicked object group
      selector = $this.data('filter'),
      group = $group.data('filter-group');      // filter group name

    if ($this.hasClass('active')) {

      if(group === 'ven') return;

      activeFilters[group] = '';

    } else {

      if (selector === '.gale-diamonds') {
        activeFilters['sar'] = '';
      }

      if (selector === '.sareen') {
        activeFilters['gdc'] = '';
      }

      activeFilters[group] = selector;

    }

    e.data.isotopeLayout.filter(activeFilters);
  }

  function onSelectChange() {
    $that = $(this);
    var filter = $that.find('option:selected').data('filter');
    if(filter === 'all') {
      $that.parent('.filters').find('.active').click();
      return;
    }
    $that.parent('.filters').find('dd[data-filter="' + filter + '"]').click();
  }

  function Filterer(el, itemEl, iso) {
    this.$filters = $(el);
    this.isotopeLayout = iso;
    this.$select = this.$filters.find('select');

    this.$gdc = {
      button: $('dd[data-filter=".gale-diamonds"]'),
      select: $('option[data-filter=".gale-diamonds"]'),
      collection: $('.gale-diamonds-collections')
    };
    this.$sareen = {
      button: $('dd[data-filter=".sareen"]'),
      select: $('option[data-filter=".sareen"]'),
      collection: $('.sareen-collections')
    };

    this.$filters.on('click', itemEl, {isotopeLayout: this.isotopeLayout }, click);
    this.$select.change(onSelectChange);
  }

  Filterer.prototype.update = function () {
    activeFilters = this.isotopeLayout.state.f;

    // $('.sareen-collections').fadeOut(100);
    // $('.gale-diamonds-collections').fadeOut(100);
    $('.filters dl').find('.active').removeClass('active');

    if(activeFilters['ven'] === '.gale-diamonds') {
      this.$gdc.button.addClass('active');
      this.$gdc.select.attr('Selected', true);
      if(this.$gdc.collection.css('display') === 'none') {
        this.$sareen.collection.fadeOut(500, function() {
          this.$gdc.collection.fadeIn(500);
        }.bind(this));
      }
      $('dd[data-filter="' + activeFilters['gdc'] + '"]').addClass('active');
      $('option[data-filter="' + activeFilters['gdc'] + '"]').attr('Selected', true);
    } else {
      this.$sareen.button.addClass('active');
      this.$sareen.select.attr('Selected', true);
      if(this.$sareen.collection.css('display') === 'none') {
        this.$gdc.collection.fadeOut(500, function() {
          this.$sareen.collection.fadeIn(500);
        }.bind(this));
      }
      $('dd[data-filter="' + activeFilters['sar'] + '"]').addClass('active');
      $('option[data-filter="' + activeFilters['sar'] + '"]').attr('Selected', true);
    }

    if(activeFilters['sha'] !== '') {
      $('dd[data-filter="' + activeFilters['sha'] + '"]').addClass('active');
      $('option[data-filter="' + activeFilters['sha'] + '"]').attr('Selected', true);
    }

  };

  return Filterer;
}());
