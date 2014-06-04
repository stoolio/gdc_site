/*! (c) 2010 jdbartlett, MIT license */
/**
 * loupe - an image magnifier for jQuery
 * (C) 2010 jdbartlett, MIT license
 * http://github.com/jdbartlett/loupe
 */
(function ($) {
  $.fn.loupe = function (arg) {
    var options = $.extend({
      loupe: 'loupe',
      width: 200,
      height: 150
    }, arg || {});

    return this.length ? this.each(function () {
      var $this = $(this), $big, $loupe,
        $small = $this.is('img') ? $this : $this.find('img:first'),
        move, hide = function () { $loupe.hide(); },
        time, // enter, leave,
        os,
        sW,
        sH,
        oW,
        oH,
        bW,
        bH,
        xFactor,
        xAdd,
        yFactor,
        yAdd;

      $loupe = $('<div />')
        .addClass(options.loupe)
        .css({
          width: options.width,
          height: options.height,
          position: 'absolute',
          overflow: 'hidden'
        })
        .append($big = $('<img />').attr('src', $small.attr($small.is('img') ? 'src' : 'href')).css('position', 'absolute'))
        //.mousemove(move)
        .hide()
        .appendTo(this);

      // bW = $big.width();
      // bH = $big.height();
      // xFactor = bW / sW;
      // xAdd = ((os.left * bW)/sW) + 100;
      // yFactor = bH / sH;
      // yAdd = ((os.top * bH)/sH) + 100;

      preCompute();

      // $loupe.hide();

      $(window).resize( function() {
        preCompute();
        // os = $small.offset();
        // sW = $small.outerWidth();
        // sH = $small.outerHeight();
        // bW = $big.width();
        // bH = $big.height();
        // xFactor = bW / sW;
        // xAdd = ((os.left * bW)/sW) - 100;
        // yFactor = bH / sH;
        // yAdd = ((os.top * bH)/sH) - 100;
      });

      if ($this.data('loupe') != null) {
        return $this.data('loupe', arg);
      }

      function preCompute() {
        os = $small.offset();
        sW = $small.outerWidth();
        sH = $small.outerHeight();
        oW = options.width / 2;
        oH = options.width / 2;
        $loupe.css('opacity', 0).show();
        bW = $big.width();
        bH = $big.height();
        $loupe.hide().css('opacity', 1);
        xFactor = bW / sW;
        xAdd = ((os.left * bW)/sW) + oW;
        yFactor = bH / sH;
        yAdd = ((os.top * bH)/sH) + oH;
      }

      var loop, loopVar, xp, yp, mouseX, mouseY,
      raf = window.mozRequestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame     ||
            window.oRequestAnimationFrame,
        caf = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

      loop = function () {
        console.log("still running");
        xp += (mouseX - xp) / 50;
        yp += (mouseY - yp) / 50;
        $loupe.css({left:xp,top:yp});
        $big.css({
          left: (-xp * xFactor + xAdd)|0,
          top: (-yp * yFactor + yAdd)|0
          // left: -(((e.pageX - os.left) / sW) * $big.width() - oW)|0,
          // top: -(((e.pageY - os.top) / sH) * $big.height() - oH)|0
        });
        raf(loop);
      };

      // enter = function(e) {
      function enter(e) {
        e.preventDefault();
        // $loupe.off();
        $loupe.show();//.mousemove(move).mouseup(leave);
        $small.mousemove(move);
        xp = e.pageX - 100;
        yp = e.pageY - 100;
        $loupe.css({left:xp,top:yp});
        loopVar = raf(loop);
      }

      // leave = function(e) {
      function leave(e) {
        // $this.off('mousemove');
        // $loupe.off('mousemove');
        caf(loopVar);
        $small.off('mousemove');
        time = setTimeout(hide, 10);
      }

      move = function (e) {
        // var os = $small.offset(),
        //   sW = $small.outerWidth(),
        //   sH = $small.outerHeight(),
        //   oW = 100; // options.width / 2,
        //   oH = 100; // options.height / 2;

        mouseX = e.pageX - 100;
        mouseY = e.pageY - 300;

        // if (!$this.data('loupe') ||
        //   e.pageX > sW + os.left + 10 || e.pageX < os.left - 10 ||
        //   e.pageY > sH + os.top + 10 || e.pageY < os.top - 10) {
        //   return hide();
        // }

        // time = time ? clearTimeout(time) : 0;

        // $loupe.css({
        //   left: e.pageX - oW,
        //   top: e.pageY - oH
        // });
        // $big.css({
        //   left: (-xp * xFactor + xAdd)|0,
        //   top: (-yp * yFactor + yAdd)|0
        //   // left: -(((e.pageX - os.left) / sW) * $big.width() - oW)|0,
        //   // top: -(((e.pageY - os.top) / sH) * $big.height() - oH)|0
        // });
      };

      $this.data('loupe', true).mouseenter(enter).mouseleave(leave);//.mousemove(enter);
        // .mouseenter(move)
        // .mouseout(function () {
        //   time = setTimeout(hide, 10);
        // });
    }) : this;
  };
}(jQuery));
