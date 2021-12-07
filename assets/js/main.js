/* javascript */
$(document).ready(function() {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  $("#toBuild").hide();
  $("form").on('submit', function(event) {
    event.preventDefault();
    let val = document.getElementById("habitInput").value;
    console.log(val);
    checkCookie(val);
    $("#toBuild").show();
    return false;
  })

  function checkCookie(name) {
    let cookieVal = Number(getCookie(name));
    console.log("checkCookie()", cookieVal)
    if (cookieVal !== "" && cookieVal !== null) {
      console.log("cookie exists", cookieVal);
      setCookie(name, cookieVal += 1, 30);
    } else {
      setCookie(name, 1, 30);
    }
  }

  function get_cookies_array() {

    var cookies = {};

    if (document.cookie && document.cookie != '') {
      var split = document.cookie.split(';');
      for (var i = 0; i < split.length; i++) {
        var name_value = split[i].split("=");
        name_value[0] = name_value[0].replace(/^ /, '');
        cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
      }
    }

    return cookies;
  }


  //Bot Page
  var habitToCheck;
  var storage = get_cookies_array();
  var habitsArray = [];
  for (var names in storage) {
    habitsArray.push(names);
  }
  $('#cont')
    .append(
      $(document.createElement('label')).prop({
        for: 'habits'
      }).html('Choose your habit: ')
    )
    .append(
      $(document.createElement('select')).prop({
        id: 'habits',
        name: 'habits'
      })
    );

  for (const val of habitsArray) {
    $('#habits').append($(document.createElement('option')).prop({
      value: val,
      text: val.charAt(0).toUpperCase() + val.slice(1)
    }));
  }

  $('#generate').click(function() {
    var e = document.getElementById("habits");
    habitToCheck = e.options[e.selectedIndex].value;
    if (document.getElementById("amazonLink") != null) {
      document.getElementById("amazonLink").href += String(habitToCheck);
      console.log(document.getElementById("amazonLink").href);
      console.log(storage[habitToCheck]);
    }
  });


  //Progress page
  console.log(habitToCheck);
  console.log(storage[habitToCheck]);
  storage = get_cookies_array();
  for (var name in storage) {
    if (document.getElementById("data") != null) {
      document.getElementById("data").innerHTML += name + " : have completed " + (storage[name] - 1) + " days <br />";
    }
  }

});
