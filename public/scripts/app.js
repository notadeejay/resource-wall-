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
<<<<<<< HEAD

var target = "https://www.google.com";
var key    = "123456";

$.ajax({
    url: "https://api.linkpreview.net",
    dataType: "jsonp",
    data: {q: target, key: key},
    success: function (response) {
        console.log(response);
    }
});
=======
  $('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 520,
      rowHeight: 520
    }
  });
>>>>>>> master
});
