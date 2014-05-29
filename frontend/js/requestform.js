var RequestForms = (function() {
  var forms = {},
    xport = {};

  xport.init = function(index, el) {
    forms[el.id] = new RequestForm(el);
  };

  var RequestForm = (function() {

    function results(msg, id, result) {
      var $el = $('[data-results-for="' + id + '"]'),
        $flash = $el.find('.template').clone();
      $flash.addClass(result).css('display', '');
      $flash.children('.results-text').text(msg);
      $el.append($flash);
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
      results(data.message, this.id, 'alert');
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

    function displayErrors(e) {
      e.preventDefault();
      var errors = this.$form.find('[data-invalid]'),
        plural = errors.length > 1 ? 's' : '',
        names = [],
        input;
      for (input in errors) {
        names.push(errors[input].name);
      }
      results('Please fix the ' + names.join(', ') + ' field' + plural, this.id, 'warning');
    }

    function RequestForm(el) {
      this.id = el.id;
      this.submitted = false;

      this.$form = $(el);
      this.$button = $(this.id + " button[type='submit']");

      this.key = this.$form.data('key') || false;
      this.url = this.$form.attr('action');

      this.$form
        .on('invalid', displayErrors.bind(this))
        .on('valid', process.bind(this));
    }

    RequestForm.prototype.init = function(){};

    return RequestForm;
  })();

  return xport;
}());
