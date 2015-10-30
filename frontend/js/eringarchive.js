var EngagementRingArchive = (function(window, IsotopeLayout, Filterer, Sorter) {

  var processPins = (function(window) {
      var cache = [];
      var requested = false;

      function clearCache() {
        var i;
        if(typeof window.buildPinButton === 'undefined') {
          setTimeout(clearCache, 500);
        }
        for( i = 0; i < 3; i++ ) {
          if(cache.length === 0) break;
          console.log("calling buildPinButton");
          window.buildPinButton(cache.shift());
        }
        if (cache.length === 0) {
          requested = false;
        } else {
          requestAnimationFrame(clearCache);
        }
      }

      return function(el) {
        cache.push(el);
        if(!requested) {
          requestAnimationFrame(clearCache);
          requested = true;
        }
      };
    })(window);

  var initPin = function(elements_left, settings) {
    // var url, media, description;
    processPins(this);
  };

  function EngagementRingArchive() {
    this.$win = $(window);
    this.$imgs = $('img.lazy');
    this.isotopeLayout = new IsotopeLayout('#engagement-ring-archive', '.engagement-ring', window);

    this.filters = new Filterer('.filters', 'dd', this.isotopeLayout.filter.bind(this.isotopeLayout));
    this.sorts = new Sorter('.sorts', 'dd', this.isotopeLayout.sort.bind(this.isotopeLayout));

    $(window).one('lazyload', this.initLazyload.bind(this))
      .on('scroll', Foundation.utils.debounce(this.triggerLazyload.bind(this), 250));
  }

  EngagementRingArchive.prototype.initLazyload = function() {
    // add .show() (here) and noscript tags in html for no-js support
    this.$imgs.lazyload({
      effect : 'fadeIn',
      failure_limit : Math.max(this.$imgs.length - 1, 0),
      threshold : 50,
      skip_invisible: true,
      event: 'lazyload',
      appear: initPin
    });
  };

  EngagementRingArchive.prototype.triggerLazyload = function() {
    this.$win.trigger('lazyload');
  };

  return EngagementRingArchive;

}(window, IsotopeLayout, Filterer, Sorter));
