const generateHTML = (obj) => {
  const html = `
      <div class ="grid-item">
        <article>
                <div class = 'articleHeader'>
                    <h5>${obj.title}</h5>
                </div>
                <div class = 'articleBody'>
                  <p class = "description">
                    <img src='http://geodavephotography.com/images/picture/36834139-picture.jpg'>
                  </p>
                </div>
                <div class = 'articleFooter'>
                   <p class = 'url'>${obj.url}</p>
                </footer>
            </article>
        </div>`
  return html
}

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

//LOGOUT HANDLER
$(".logoutbutton").on("click", function (event) {
  event.preventDefault();
  $.ajax ({
    url: "/api/users/logout",
    method: "POST"
  }).then(function (result) {
    window.location.href = "/"
  });
});


const loadResources = () => {
$.ajax({
    method: "GET",
    url: "/api/resources/resources"
  }).done((resources) => {

     renderResources(resources)

  });;
}


$('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 400,
      rowHeight: 400
    }
  });


  $('#searchButton').click(function() {
    $('#searchBar').animate({width: 'toggle'});
  })


 const renderResources = (data) => {
  $('#grid').html('');
    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateHTML)
              .join('')
    $('#grid').html(html)
  }

loadResources();

});
