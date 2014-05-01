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
      postData = {
        shape: [],
        color: [],
        clarity: [],
        cut: []
      };

    for (var d in data) {
      switch(data[d].name) {
        case 'shape':
        postData.shape.push(data[d].value);
        break;
        case 'color':
        postData.color.push(data[d].value);
        break;
        case 'clarity':
        postData.clarity.push(data[d].value);
        break;
        case 'cut':
        postData.cut.push(data[d].value);
        break;
        default:
        postdata[data[d].name] = data[d].value;
      }
    }

    // postData.size;
    // postData.budget;
    // postData.name;
    // postData.email;
    // postData.state;
    // postData.phone;
    // postData.comments;

    var posting = $.post( url, postData );
    // Put the results in a div
    posting.done(function( data ) {
      console.log(data);
    });
  });

});
