const STORE = [
  {
      fact: "Early stage ovarian cancer symptoms include: abdominal discomfort, nausea, loss of appetite, increased frequency of urination, etc. If you experience these for more than 2 consecutive weeks, we recommend consulting your doctor.",
      color: "#DFECEC",
      category: "ovarian cancer"

  },
  {
      fact: "If breast cancer is highly prevalent in your family, you may be positive for BRCA1 or BRCA2, which greatly increases your risk.",
      color: "rgba(255, 210, 224, 0.42)"
  },
  {
      fact: "Although HPV only presents a risk for cervical cancer in females, males can carry and sexually transmit the virus, so ideally everyone should be vaccinated.",
      color: "#F3F3F3"
  },
  {
      fact: "If you have never been pregnant, you have an increased risk of ovarian cancer.",
      color: "#DFECEC"
  },
  {
      fact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      color: "#F3F3F3"
  },
  {
      fact: "If breast cancer is highly prevalent in your family, you may be positive for BRCA1 or BRCA2, which greatly increases your risk.",
      color: "rgba(255, 210, 224, 0.42)"
  },
  {
      fact: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      color: "#F3F3F3"
  },
  {
      fact: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      color: "#DFECEC"
  },
  {
      fact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
      color: "#F3F3F3"
  },
  {
      fact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      color: "rgba(255, 210, 224, 0.42)"
  }

];


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function message(status, shake=false, id="") {
  if (shake) {
    $("#"+id).effect("shake", {direction: "right", times: 2, distance: 8}, 250);
  } 
  document.getElementById("feedback").innerHTML = status;
  $("#feedback").show().delay(2000).fadeOut();
}

function error(type) {
  $("."+type).css("border-color", "#E14448");
}

var login = function() {
  $.post({
    type: "POST",
    url: "/",
    data: {"username": $("#login-user").val(), 
           "password": $("#login-pass").val()},
    success(response){
      var status = JSON.parse(response)["status"];
      if (status === "Login successful") { location.reload(); }
      else { error("login-input"); }
    }
  });
};

function renderInfoFacts () {
  let randNum1 = getRandomInt(STORE.length);
  let randNum2 = getRandomInt(STORE.length);
  let randNum3 = getRandomInt(STORE.length);

  $(".facts").html(` <li style="background-color:${STORE[randNum1].color};"> ${STORE[randNum1].fact}</li><li style="background-color:${STORE[randNum2].color}"> ${STORE[randNum2].fact}</li><li style="background-color:${STORE[randNum3].color}"> ${STORE[randNum3].fact}</li>`);

}

function navBar () {
  // Home Navigation
  $(".nav li").on("click", ".navHome", function (){
    location.reload();
  });
  // Calendar Navigation
  $(".nav li").on("click", ".navCalendar", function (){
    $(".profile-page").html(`<div class="googCal">CALENDAR<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=bmluYS5odXV1QGdtYWlsLmNvbQ&amp;src=emhpbHVmZkBnbWFpbC5jb20&amp;color=%237CB342&amp;color=%239E69AF&amp;mode=WEEK&amp;showPrint=0&amp;showTz=0&amp;showNav=1&amp;showTitle=0" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe></div>`)
  });

  // Find a Doctor Navigation, it'll take from the database of doctors from your provider and return the one that is nearby to you or have a convienent time for your schedule.
  $(".nav li").on("click", ".navDoctor", function (){
    $(".profile-page").html(`<div class="googCal">Doctor<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=bmluYS5odXV1QGdtYWlsLmNvbQ&amp;src=emhpbHVmZkBnbWFpbC5jb20&amp;color=%237CB342&amp;color=%239E69AF&amp;mode=WEEK&amp;showPrint=0&amp;showTz=0&amp;showNav=1&amp;showTitle=0" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe></div>`)
  });

  // Your Health Profile Navigation
  $(".nav li").on("click", ".navHealth", function (){
    $(".profile-page").html(navHealthhtml);
  });
}

function renderTime () {
  var today = new Date()
  var curHr = today.getHours()
  if (curHr < 12) {
    $(".time").html("Morning");
  } else if (curHr < 18) {
    $(".time").html("Afternoon");
  } else if (curHr < 20) {
    $(".time").html("Evening");
  } else {
    $(".time").html("Night");
  }
}

$(document).ready(function() {
  renderInfoFacts();
  renderTime();
  navBar();
  $(document).on("click", "#login-button", login);
  $(document).keypress(function(e) {if(e.which === 13) {login();}});
  //login information post into the account.db
  $(document).on("click", "#signup-button", function() {
    $.post({
      type: "POST",
      url: "/signup",
      data: {"username": $("#signup-user").val(), 
             "email": $("#signup-mail").val(),
             "password": $("#signup-pass").val()}, 
             //"healthcare": $("#signup-provider").val(),
             //"age": $("#signup-age").val()},
      success(response) {
        var status = JSON.parse(response)["status"];
        if (status === "Signup successful") { 
          location.reload(); 
        }
        else { message(status, true, "signup-box"); }
      }
    });

  });


  // // healthcare information post into account.db with the data attach to the user
  // $(document).on("click", "#form-button", function() {
  //   $.post({
  //     type: "POST",
  //     url: "/signup",
  //     data: {"username": $("#signup-user").val(), 
  //            "password": $("#signup-pass").val(), 
  //            "email": $("#signup-mail").val()},
  //     success(response) {
  //       var status = JSON.parse(response)["status"];
  //       if (status === "Signup successful") { location.reload(); }
  //       else { message(status, true, "signup-box"); }
  //     }
  //   });
  // });


  $(document).on("click", "#save", function() {
    $.post({
      type: "POST",
      url: "/settings",
      data: {"username": $("#settings-user").val(), 
             "password": $("#settings-pass").val(), 
             "email": $("#settings-mail").val()},
      success(response){
        message(JSON.parse(response)["status"]);
      }
    });
  });
});

// Open or Close mobile & tablet menu
// https://github.com/jgthms/bulma/issues/856
$("#navbar-burger-id").click(function () {
  if($("#navbar-burger-id").hasClass("is-active")){
    $("#navbar-burger-id").removeClass("is-active");
    $("#navbar-menu-id").removeClass("is-active");
  }else {
    $("#navbar-burger-id").addClass("is-active");
    $("#navbar-menu-id").addClass("is-active");
  }
});