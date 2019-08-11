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

  $(".facts").html(`<span background-color="${STORE[randNum1].color}"> <p>${STORE[randNum1].fact}</p></span><span background-color="${STORE[randNum2].color}"> <p>${STORE[randNum2].fact}</p></span><span background-color="${STORE[randNum3].color}"> <p>${STORE[randNum4].fact}</p></span>`);

}


$(document).ready(function() {
  renderInfoFacts();
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