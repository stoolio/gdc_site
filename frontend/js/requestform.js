var RequestForms = (function() {
  var forms = {},
    xport = {};

  xport.init = function(index, el) {
    forms[el.id] = new RequestForm(el);
  };

  var RequestForm = (function() {

    function results(msg, id, result) {
      $el = $('[data-results-for="' + id + '"]');
      $el.addClass(result);
      $el.children('h3').text(msg);
      $el.fadeIn(1000);
    }

    function success(data) {
      this.submitted = true;
      if(this.key) {
        var value;
        if($.cookie(this.key) === undefined) {
          value = Date.now();
        } else {
          value = $.cookie(this.key) + '|' + Date.now();
        }
        $.cookie(this.key, value, { expires: 180, path: '/' });
      }
      this.$form.fadeOut( results(data.message, this.id, 'success') );
    }

    function fail(data) {
      results(data.message, this.id, 'failure');
    }

    function process(e) {
      e.preventDefault();
      var $b = this.$button;

      $b.children('.text').fadeOut(function() {
        $b.children('.loading').fadeIn();
      });

      var data = this.$form.serialize();

      this.request = $.post( this.url, data, success.bind(this)).fail(fail.bind(this));
    }

    function RequestForm(el) {
      this.id = el.id;
      this.submitted = false;

      this.$form = $(el);
      this.$button = $(this.id + " button[type='submit']");
      // this.$results = this.$form.children('.results');

      this.key = this.$form.data('key') || false;
      // this.type = this.$form.data('type');
      this.url = this.$form.attr('action');

      this.$form.submit(process.bind(this));
    }

    RequestForm.prototype.init = function(){};

    return RequestForm;
  })();

  return xport;
}());
