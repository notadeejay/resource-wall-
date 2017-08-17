$(() => {
  $("#loginform").on("submit", function(event) {
    let data = $(this).serialize()
    event.preventDefault();
    $.ajax({
        url: "/api/users/login",
        method: "POST",
        data: data,
         }).then(function (result) {
          window.location.href = "/resources"
  });
});


});
