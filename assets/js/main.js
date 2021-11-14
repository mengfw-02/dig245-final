/* javascript */
var input;
$(document).ready(function() {
  $("form").on('submit',function(event) {
    // input = $( "habitInput" ).val();
    input = document.getElementById("habitInput").value;
    console.log(input);
  $(".next_button").css("visibility", "visible");
    // document.getElementById("habit").innerHTML = input;
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
