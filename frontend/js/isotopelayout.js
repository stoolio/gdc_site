var IsotopeLayout = (function(window) {
  var $win = $(window);
    // defaultState = {
    //   f: {
    //     'gdc': '',
    //     'sar': '',
    //     'ven': '.gale-diamonds'
    //   },
    //   s: {
    //     'by': '',
    //     'dir': ''
    //   }
    // };

  function defaultState() {
    return {
      f: {
        'gdc': '',
        'sar': '',
        'ven': '.gale-diamonds'
      },
      s: {
        'by': '',
        'dir': ''
      }
    };
  }

  function decodeURIHash() {
    var e,
        d = function (s) { return decodeURIComponent(s).replace(/\+/g, " "); },
        q = decodeURIComponent(window.location.hash.slice(1)),
        r = /([^&=]+)=?([^&]*)/g,
        urlParams = {};

    while (e = r.exec(q)) {
      if (e[1].indexOf("[") == "-1")
          urlParams[d(e[1])] = d(e[2]);
      else {
        var b1 = e[1].indexOf("["),
            aN = e[1].slice(b1+1, e[1].indexOf("]", b1)),
            pN = d(e[1].slice(0, b1));

        if (typeof urlParams[pN] != "object")
          urlParams[d(pN)] = {};
          //urlParams[d(pN)].length = 0;

        if (aN)
          urlParams[d(pN)][d(aN)] = d(e[2]);
        else
          Array.prototype.push.call(urlParams[d(pN)], d(e[2]));
      }
    }

    return urlParams;
  }

  function normalizeDecodedURIHash() {
    var state = decodeURIHash();

    if(Object.getOwnPropertyNames(state).length === 0) {
      console.log("Default State!!");
      return defaultState();
    }

    if(state.f['ven'] === '.gale-diamonds') {
      state.f['sar'] = '';
    } else {
      state.f['gdc'] = '';
    }
    state.s['dir'] = state.s['dir'] === 'true' ? true : false;

    return state;
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

    if(window.location.hash !== '') {
      this.state = normalizeDecodedURIHash(); //$.deparam.fragment(window.location, true);
      console.log(this.state);
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
    console.log('updating iso');
    this.state = normalizeDecodedURIHash();
    console.log("onhashchange refresh:");
    console.log(this.state);
    console.log("onhashchange finish");
    this.update();
    for (var i = this.updates.length - 1; i >= 0; i--) {
      this.updates[i]();
    }
  };

  IsotopeLayout.prototype.filter = function(filters) {
    this.state.f = filters;
    this.setState();
  };

  IsotopeLayout.prototype.sort = function(sortBy, sortDir) {
    this.state.s = {
      'by': sortBy,
      'dir': sortDir
    };
    this.setState();
  };

  IsotopeLayout.prototype.setState = function(options) {
    window.location.hash = $.param(this.state);
  };

  IsotopeLayout.prototype.update = function() {
    $('.no-items-available').fadeOut();

    isoFilter = '';
    for(var filter in this.state.f) {
      isoFilter += this.state.f[filter];
    }

    console.log(isoFilter);
    console.log(this.state.s['by']);
    console.log(this.state.s['dir']);

    this.$container.isotope({
      filter: isoFilter,
      sortBy: this.state.s['by'],
      sortAscending: this.state.s['dir'],
    });

    setTimeout(testIfNothing.bind(this), 500);
  };

  return IsotopeLayout;
}(window));
