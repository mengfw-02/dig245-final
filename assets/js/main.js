/* javascript */
$(document).ready(function() {
  var input;
  $("form").on('submit',function(event) {
    input = $( "habitInput" ).first().val();
    console.log(input);
    event.preventDefault();
  });
  // $("submit_habit").click(function() {
  //   var input = document.getElementById("habitInput");
  //   console.log(input);
  // });
  // $.ajax({
  //   type: "POST",
  //   data: input,
  //   sucess: function(){
  //     console.log("sucess");
  //   }
  // });

});
