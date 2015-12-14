
$('document').ready(function(){
  $('.btn.btn-success').click(function(){
    $.ajax({
      success: function( response ) {
        $('.addQuestion').append($('#selection').html());
      }
    });

  });
});
