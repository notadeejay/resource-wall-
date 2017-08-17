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
  $('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 520,
      rowHeight: 520
    }
  });

  $('#searchButton').click(function() {
    $('#searchBar').animate({width: 'toggle'});
  })

});
