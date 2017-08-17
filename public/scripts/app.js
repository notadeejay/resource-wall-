$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 520,
      rowHeight: 520
    }
  });
});