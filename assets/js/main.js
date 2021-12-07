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

  function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

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

  //Start Page
  $(".added").hide();
  $(".warning").hide();
  $("form").on('submit', function(event) {
    event.preventDefault();
    let val = document.getElementById("habitInput").value;
    if (val != "" && val != null) {
      checkCookie(val);
      $(".added").show().delay(1000).fadeOut();
      $(".warning").hide();
    } else {
      $(".warning").show();
    }
    return false;
  })

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
      }).html('Today, I have completed: ')
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

  $(".added").hide();
  $(".amazon").hide();
  $(".garden").hide();

  var i = 0;
  var txt = "Hello welcome back! Which habit have you completed it?";
  var j = 0;
  var txt2 = "My friend Alexa has something for you. Would you like to check it out?";
  var speed = 30;
  var speed2 = 30;
  var timer = typeWriter();


  function typeWriter() {
    var ans;
    if (i < txt.length) {
      document.getElementById("dialog1").innerHTML += txt.charAt(i);
      i++;
      ans = setTimeout(typeWriter, speed);
    }
    return ans;
  }

  function typeWriter2() {
    // clearInterval(timer);
    if (j < txt2.length) {
      document.getElementById("dialog2").innerHTML += txt2.charAt(j);
      j++;
      setTimeout(typeWriter2, speed2);
    }
  }
  $('#generate').click(function() {
    var e = document.getElementById("habits");
    habitToCheck = e.options[e.selectedIndex].value;
    $(".amazon").show();
    if (document.getElementById("amazonLink") != null) {
      document.getElementById("amazonLink").href = "https://www.amazon.com/s?k=" + String(habitToCheck);
      checkCookie(habitToCheck);
    }
    $(".added").show().delay(1000).fadeOut();
  });
  if (!($("#elmentid").is(':hidden'))) {
    typeWriter2();
  }

  $("#amazonLink").click(function() {
    $(".garden").show();
  });
  $("#nothx").click(function() {
    $(".garden").show();
  });

  //Progress page
  storage = get_cookies_array();
  for (var name in storage) {
    if (document.getElementById("data") != null) {
      document.getElementById("data").innerHTML += name + " : have completed " + (storage[name] - 1) + " days <br />";
    }
  }

});
