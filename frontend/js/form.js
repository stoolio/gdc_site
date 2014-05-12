$(document).ready(function($) {
  var ShapeSelector,
    shapeSelector,
    RequestForm,
    forms = {};

  ShapeSelector = (function() {

    function ShapeSelector(el) {
      this.el = el;
      this.$this = $(el).on('click', 'li', this.handleClick);
    }

    ShapeSelector.prototype.handleClick = function () {
      var $this = $(this),
        name = $this.text().trim(),
        $option = $("#shape-list option:contains('" + name + "')");

      isActive = $option.attr('Selected') ? true : false;
      $this.toggleClass('active');
      $option.attr('Selected', !isActive);
    };

    return ShapeSelector;
  })();

  RequestForm = (function() {

    function RequestForm(el) {
      this.el = el;
      this.id = el.id;
      this.submitted = false;

      this.$form = $(el);
      this.$button = $(this.id + " button[type='submit']");

      this.type = this.$form.data('type');
      this.url = this.$form.attr('action');

      this.$form.submit(this.process.bind(this));
    }

    RequestForm.prototype.success = function(data) {
      this.submitted = true;
      this.$form.fadeOut( function() {
        var $results = $('.results');
        $results.children('h1').text(data.message);
        $results.fadeIn(1000);
      });
    };

    RequestForm.prototype.fail = function(data) {
      console.log("Error");
      console.log(data);
    };

    RequestForm.prototype.process = function ( event ) {
      event.preventDefault();
      var $b = this.$button;

      $b.children('.text').fadeOut(function() {
        $b.children('.loading').fadeIn();
      });

      var data = this.$form.serialize();

      this.request = $.post( this.url, data, this.success.bind(this)).fail(this.fail.bind(this));
    };

    return RequestForm;
  })();

  $('#state-selector').select2({
    placeholder: "Select a State"
  });

  shapeSelector = new ShapeSelector('#shape-selector');

  $('form').each(function(index, el) {
    forms[el.id] = new RequestForm(el);
  });

});
