/*! (c) 2010 jdbartlett, MIT license */
/**
 * loupe - an image magnifier for jQuery
 * (C) 2010 jdbartlett, MIT license
 * http://github.com/jdbartlett/loupe
 */
(function ($, window) {

  $.fn.loupe = function (arg) {
    var options = $.extend({
      loupe: 'loupe',
      width: 200,
      height: 150,
      method: 'hover',
      onFn: 'mouseenter',
      offFn: 'mouseleave',
      moveFn: 'mousemove',
      sensitivity: 10
    }, arg || {});

    // requestAnimationFrame polyfill to support all browsers
    // with setTimeout fallback
    var raf = window.requestAnimationFrame       ||
              window.mozRequestAnimationFrame    ||
              window.webkitRequestAnimationFrame ||
              window.msRequestAnimationFrame     ||
              window.oRequestAnimationFrame      ||
              // We use 33.3 as the timeout for 30fps
              function(fn) { return setTimeout(fn, 33.3); },
        caf = window.cancelAnimationFrame    ||
              window.mozCancelAnimationFrame ||
              window.clearTimeout,
        $win = $(window),
        debounce,
        isTouch = typeof Modernizr === 'undefined' ?
          // This is a portion of the Modernizr test, the rest of the test
          // requires a bunch of extra code, use Modernizr for the full test
          ('ontouchstart' in window) ||
          window.DocumentTouch && document instanceof DocumentTouch :
          Modernizr.touch;

    // If you include jquery.ba-throttle-debounce.js before this file
    // it's debounce function will be used, see:
    // http://benalman.com/projects/jquery-throttle-debounce-plugin/

    // Function from Remy Sharp
    // @ http://remysharp.com/2010/07/21/throttling-function-calls/

    // used for window resize and scroll events
    debounce = $.debounce || function (wait, fn) {
      var timer = null;
      return function () {
        var that = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(that, args);
        }, wait);
      };
    };

    if (options.method === 'click' && !isTouch) {
      options.onFn = 'mousedown';
      options.offFn = 'mouseup';
    } else if (isTouch) {
      options.onFn = 'touchstart';
      options.offFn = 'touchend';
      options.moveFn = 'touchmove';
    }

    // switch (options.method) {
    //   case 'click':
    //   break;
    //   case 'hover':
    //   default:
    //   break;
    // }

    return this.length ? this.each(function () {
      var $this = $(this), $big, $loupe,
        $small = $this.is('img') ? $this : $this.find('img:first'),
        hideLoupe = function () { return $loupe.hide(); },
        showLoupe = function () { return $loupe.show(); },
        time,
        loupeOffset = {
          x: 0,
          y: 0
        },
        xFactor,
        xAdd,
        yFactor,
        yAdd,
        animateID,
        mouse = {
          x: 0,
          y: 0
        },
        boundingRect = {
          minX: 0,
          maxX: 0,
          minY: 0,
          maxY: 0
        },
        // This functions as a protection against the code running "backwards"
        // it prevents rebinding callbacks multiple times in function enter(e)
        // and short circuits leave if already deactivated.
        // The proper order is:
        // mouseenter|mousedown on image -> enter
        //  enter shows loupe binds callbacks, starts animation
        //  mouse is over the loupe now
        // mouseleave|mouseup on loupe -> leave
        activated = false,
        move = isTouch ? touchMove : mouseMove;

      if ($this.data('loupe') != null) {
        return $this.data('loupe', arg);
      }

      $loupe = $('<div />')
        .addClass(options.loupe)
        .css({
          width: options.width,
          height: options.height,
          position: 'absolute',
          overflow: 'hidden'
        })
        .append(
          $big = $('<img />')
          .attr('src', $this.attr($this.is('img') ? 'src' : 'href'))
          .css('position', 'absolute')
        )
        .hide()
        .appendTo("body");

      // function showLoupe() {
      //   return $loupe[options.hideFn]();
      // }

      // function hideLoupe() {
      //   return $loupe[options.showFn]();
      // }

      // These variables only need to be calculated once
      // it saves some calculation time during the mousemove and animation
      function computeOffsets() {
        var os = $small.offset(),
        sW = $small.outerWidth(),
        sH = $small.outerHeight(),
        bW, bH;
        loupeOffset.x = options.width / 2;
        loupeOffset.y = options.width / 2;
        // hide and attach to DOM so we can get a proper
        // width and height
        $loupe.css('opacity', 0).show();
        bW = $big.width();
        bH = $big.height();
        $loupe.hide().css('opacity', 1);
        boundingRect.minX = os.left + options.sensitivity;
        boundingRect.maxX = sW + os.left - options.sensitivity;
        boundingRect.minY = os.top + options.sensitivity;
        boundingRect.maxY = sH + os.top - options.sensitivity;
        xFactor = bW / sW;
        xAdd = ((os.left * bW)/sW) + 100;
        yFactor = bH / sH;
        yAdd = ((os.top * bH)/sH) + 100;
      }

      // function followMove(e) {
      //   e.preventDefault();
      //   mouse.x += (e.pageX - mouse.x) / 24;
      //   mouse.y += (e.pageY - mouse.y) / 24;
      //   //(destination - position) / damping;
      // }

      function mouseMove(e) {
        // this function can run hundreds of times per second
        // this is about as thin as it can get
        e.preventDefault();
        mouse.x = e.pageX;
        mouse.y = e.pageY;
      }

      function touchMove(e) {
        e.preventDefault();
        var touch = e.originalEvent.touches && e.originalEvent.touches[0];
        if (typeof touch !== undefined) {
          mouse.x = touch.pageX;
          mouse.y = touch.pageY;
        }
      }

      function enter(e) {
        console.log('entering');
        // only required for click/mousedown, but it doesn't hurt otherwise
        e.preventDefault();

        if (activated) return;
        activated = true;
        console.log('true enter');

        // Sets initial position, prevents a jumpy loupe
        move(e);
        animate();

        showLoupe().on(options.moveFn, move);

        // $this.off(options.onFn, enter);
        // $loupe.on(options.offFn, leave);

        $win.scroll(debouncedOutOfBounds);

        // Start animation loop, save ID so we can cancel
        animateID = raf(animate);
      }

      function leave(e) {
        console.log('leaving');
        if(!activated) return;
        activated = false;

        // Remove mousemove listener because it's fairly taxing
        $loupe.off(options.moveFn);

        // Cancel animation loop
        caf(animateID);

        // remove window scroll listener, $win.off() or $win.off('scroll') could
        // remove events from other js on the page
        $win.off('scroll', debouncedOutOfBounds);

        hideLoupe();

        console.log('true leaving');
      }

      function outOfBounds() {
        if (!activated) return;
        if (mouse.x > boundingRect.maxX || mouse.x < boundingRect.minX ||
            mouse.y > boundingRect.maxY || mouse.y < boundingRect.minY) {
          console.log('oob, triggering offFn');
          // hideLoupe();
          $this.trigger('loupe.deactivate');
          // leave();
        }
      }

      // We create these special functions so we can unbind them properly
      // see the enter & leave functions
      var debouncedOutOfBounds = debounce(500, outOfBounds);
      var debouncedComputeOffsets = debounce(1000, computeOffsets);

      function animate() {
        if (!activated) return;
        outOfBounds();
        // var left = Math.min(mouse.x, boundingRect.maxX-loupeOffset.x);
        //   top = Math.min(mouse.x, boundingRect.maxY-loupeOffset.y);
        // left = Math.max(left, boundingRect.minX+loupeOffset.x);
        // top = Math.max(top, boundingRect.minY+loupeOffset.y);
        $loupe.css({
          left: mouse.x - loupeOffset.x,
          top: mouse.y - loupeOffset.y
        });
        $big.css({
          left: (-mouse.x * xFactor + xAdd)|0,
          top: (-mouse.y * yFactor + yAdd)|0
        });
        if (activated) raf(animate);
      }

      // this must be run at least once before starting but, after the $loupe
      // item has been created
      computeOffsets();

      // a window resize could change things on a responsive website
      // it's debounced to accommodate drag resizing
      $win.resize(debouncedComputeOffsets);

      $this.data('loupe', true).on(options.onFn, enter)
        .on('loupe.deactivate', leave);
      // $loupe.on(options.offFn, leave);
      $loupe.on(options.offFn, function() {
        $this.trigger('loupe.deactivate');
      });

      // [options.onFn, options.offFn].forEach(function(ev) {
      //   $loupe.on(ev, function(e) {
      //     $this.trigger(ev);
      //   });
      // });

    }) : this;
  };
}(jQuery, window));
