$(() => {

  //REGISTRATION HANDLER
  $("#registrationform").on("submit", function (event) {
      let $this = $(this)
      let data  = $(this).serialize()
      event.preventDefault();
      $.ajax({
          url: "/api/users/register",
          method: "POST",
          data: data,
      }).then(function (result) {
        window.location.href = "/resources"
        getCurrentUser();
      });
  });

  //LOGIN HANDLER
  $("#loginform").on("submit", function(event) {
    let data  = $(this).serialize()
    let $this = $(this)
    event.preventDefault();
    $.ajax({
        url: "/api/users/login",
        method: "POST",
        data: data,
    }).then(function (result) {
      console.log(result)
      window.location.href = "/resources"
      getCurrentUser();
    });
  });


  const getCurrentUser = () => {
    $.ajax({
      url: "/api/users",
      method: "GET"
    }).then(function (result) {
      let name = result[0].first_name
      localStorage.setItem ("userName", name)
      localStorage.setItem("currentUser", result[0].id)
    })
 }

  const loadUsername = () => {
    let name     = localStorage.getItem('userName');
    let low_name = name.toLowerCase()
      $("#username").text("hello " + low_name)
  }

  loadUsername()

  //LOGOUT HANDLER
  $(".logoutbutton").on("click", function (event) {
    event.preventDefault();
    $.ajax ({
      url: "/api/users/logout",
      method: "POST"
    }).then(function (result) {
      window.location.href = "/"
      localStorage.removeItem("currentUser")
    });
  });


  //EDIT PROFILE
  $("#edit").on("submit", function(event) {
    let data = $(this).serialize();
    $("#edit").trigger("reset");
    event.preventDefault();
    $.ajax({
      url: "/api/users/edit",
      method: "PUT",
      data: data,
    }).then(function (resources) {

       setTimeout(function () {
            swal({
              title: "Success!",
              text: "Your profile has been updated",
              type: "success",
              confirmButtonText: "OK"
            },

            function(isConfirm){
              if (isConfirm) {
                getCurrentUser()
                window.location.href = "/resources";
              }
            });
        }, 1000);
     })
  });

});