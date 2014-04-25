$(document).foundation();

$(document).ready(function($) {
  $('#shape-selector').on('click', 'li', function () {
    var $this = $(this);
      name = $this.text();
    $this.toggleClass('active');
    $("#shape-list option:contains('Round')").attr('Selected','selected');
  });
});
