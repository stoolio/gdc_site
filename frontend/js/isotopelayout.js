var IsotopeLayout = (function(window) {
  var $win = $(window);

  function defaultState() {
    return {
      f: {
        'gdc': '',
        'sar': '',
        'ven': ''
      },
      s: {
        'by': '',
        'dir': ''
      }
    };
  }

  function setState(state) {
    var temp = {};
    for(var b in state) {
      for(var c in state[b]) temp[b+c] = state[b][c];
    }
    window.location.hash = $.param(temp);
  }

  function getState() {
    if(window.location.hash )
    var temp = defaultState();
    window.location.hash.split('&').forEach(function(el){
      var parts = el.split('='),
        a = parts[0][0],
        b = parts[0].slice(1),
        c = parts[1];
      temp[a][b] = c;
    }, this);

    return temp;
  }

  function layoutComplete() {
    // Scroll event triggers lazyload check
    setTimeout(function() {
      $win.trigger('scroll');
    }, 100);
  }

  function testIfNothing() {
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
  }

  function IsotopeLayout(el, itemEl) {
    this.$win = $win;
    this.$container = $(el);
    this.itemSelector = itemEl;
    this.dirty = {
      filter: true,
      sort: true
    };

    if(window.location.hash === '') {
      setState(defaultState());
    }

    this.defaults = {
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
      }
    };
  }

  IsotopeLayout.prototype.initialize = function(options, updates) {
    this.updates = updates;
    var currentOptions = $.extend(this.defaults, options);
    this.$container.isotope(currentOptions);
    this.$container.isotope('on', 'layoutComplete', layoutComplete);
    this.refresh();
    window.onhashchange = this.refresh.bind(this);
  };

  IsotopeLayout.prototype.refresh = function() {
    this.state = getState();
    this.update();
    if(this.dirty.filter) {
      this.updates.filter();
      this.dirty.filter = false;
    }
    if(this.dirty.sort) {
      this.updates.sort();
      this.dirty.sort = false;
    }
  };

  IsotopeLayout.prototype.filter = function(filters) {
    this.state.f = filters;
    this.dirty.filter = true;
    setState(this.state);
  };

  IsotopeLayout.prototype.sort = function(sortBy, sortDir) {
    this.state.s = {
      'by': sortBy,
      'dir': sortDir
    };
    this.dirty.sort = true;
    setState(this.state);
  };

  IsotopeLayout.prototype.update = function() {
    $('.no-items-available').fadeOut();

    isoFilter = '';
    for(var filter in this.state.f) {
      isoFilter += this.state.f[filter];
    }

    this.$container.isotope({
      filter: isoFilter,
      sortBy: this.state.s['by'],
      sortAscending: this.state.s['dir'],
    });

    setTimeout(testIfNothing.bind(this), 500);
  };

  return IsotopeLayout;
}(window));
