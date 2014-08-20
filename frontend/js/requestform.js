var RequestForms = (function() {
  var forms = {},
    xport = {};

  xport.init = function(index, el) {
    forms[el.id] = new RequestForm(el);
  };

  var RequestForm = (function() {

    function results(msg, id, result) {
      var $el = $('[data-results-for="' + id + '"]'),
        $flash = $el.find('.' + result);
      if ($flash.length === 0) {
        $flash = $el.find('.template').clone();
        $flash.removeClass('template').addClass(result).css('display', '');
        $el.append($flash);
      }
      $flash.children('.results-text').text(msg);
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
        plural = errors.length > 1,
        names = [],
        input,
        resultsString = 'There are errors in the ';
      for (var i = errors.length - 1; i >= 0; i--) {
        names.push(errors[i].name);
      }
      if(plural) {
        resultsString += names.slice(0,-1).join(', ') + ' and ' + names[names.length-1] + ' fields.';
      } else {
        resultsString += names[0] + ' field.';
      }
      results(resultsString, this.id, 'warning');
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
