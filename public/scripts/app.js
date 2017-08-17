$(() => {

//REGISTRATION HANDLER
$("#registrationform").on("submit", function (event) {
    let $this = $(this)
    let data = $(this).serialize()
    event.preventDefault();
    $.ajax({
        url: "/api/users/register",
        method: "POST",
        data: data,
         }).then(function (result) {
          window.location.href = "/new"

        });
});

//LOGIN HANDLER
  $("#loginform").on("submit", function(event) {
    let data = $(this).serialize()
    let $this = $(this)
    event.preventDefault();
    $.ajax({
        url: "/api/users/login",
        method: "POST",
        data: data,
         }).then(function (result) {

          window.location.href = "/resources"
  });
});


$('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 390,
      rowHeight: 390
    }
  });


  $('#searchButton').click(function() {
    $('#searchBar').animate({width: 'toggle'});
  })

});
