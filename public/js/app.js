$(document).foundation();

$(document).ready(function($) {
  $('#shape-selector').on('click', 'li', function () {
    var $this = $(this),
      name = $this.text().trim(),
      $option = $("#shape-list option:contains('" + name + "')");

    isActive = $option.attr('Selected') ? true : false;
    $this.toggleClass('active');
    $option.attr('Selected', !isActive);
  });

  $( "#diamond-request" ).submit(function( event ) {
    event.preventDefault();

    var $form = $(this),
      url = $form.attr( "action" ),
      data = $form.serializeArray(),
      d,
      postData = {
        shape: [],
        color: [],
        clarity: [],
        cut: []
      };

    for (d in data) {
      switch(data[d].name) {
        case 'shape':
        case 'color':
        case 'clarity':
        case 'cut':
          postData[data[d].name].push(data[d].value);
          break;
        default:
          postData[data[d].name] = data[d].value;
      }
    }

    var diamondRequest = $.post( url, postData, function() {
      alert( "success" );
    })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
        // alert( "finished" );
      });
  });

});
