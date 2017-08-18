const generateHTML = (obj) => {
  const html = `
      <div class ="grid-item">
        <article>
                <div class = 'articleHeader'>
                    <h5>${obj.title}</h5>
                </div>
                <div class = 'articleBody'>
                  <img src="http://eskipaper.com/images/modern-wallpaper-8.jpg">
                </div>
                <div class = 'articleFooter clearfix'>
                   <a href='#' class='favourite' data-resID='${obj.id}'><i class="like material-icons">favorite</i></a>
                   <a href='#'><span><i class="add material-icons">add_circle</i></span></a>
                </footer>
            </article>
        </div>`
  return html;
}

const generateInfo = (obj) => {
  const html = `
            <div id='editCard'>
              <h4>edit your cars</h4>
              <p>sample stuff</p>
              <p>sample stuff</p>
              <p>sample stuff</p>
              <p>sample stuff</p>
              <p>sample stuff</p>
              <button id='exit'>exit</button>
            </div>`;
  return html;
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
     // generatePreview(resources)
     renderResources(resources)

  });
}

//SEARCH BAR
$("#search").on("submit", function(event) {
    let data = $(this).serialize();
    event.preventDefault();
    $.ajax({
        url: "/api/resources/search",
        method: "GET",
        data: data,
         }).then(function (resources) {
          renderResources(resources)
  });
  $('#search').animate({width: 'toggle'});
});



$('.grid').isotope({
    layoutMode: 'cellsByRow',
    itemSelector: '.grid-item',
    cellsByRow: {
      columnWidth: 400,
      rowHeight: 400
    }
  });

  $('#searchButton').click(function() {
    $('#search').animate({width: 'toggle'});
  })

//RENDER RESOURCES
 const renderResources = (data) => {
  $('#grid').html('');
  let html = data
            .sort((a,b) => b.id - a.id)
            .map(generateHTML)
            .join('')
  console.log(data)
  $('#grid').html(html)
}


  const renderInfo = (data) => {

  // move render info in here from below

    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateHTML)
              .join('')
    $('#grid').html(html)
  }


$('#grid').on('click', '.articleFooter span i', function(e) {
  e.preventDefault();
  $.colorbox({
    html: "<div id='editCard'><h4>edit your card</h4><br /><p>sample stuff</p><p>sample stuff</p><p>sample stuff</p><p>sample stuff</p><p>sample stuff</p><button id='exit'>exit</button></div>",     // generateInfo(obj)
    width: 500,
    transition: "elastic",
  });
});

//   const generatePreview = (obj) => {
//     let key = '599620a6888eff2fedf501c8f8271e520e3301cc25605'
//     let array = [];
//      obj.forEach((r) => {
//       let target = r.url
//     $.ajax({
//         url: "https://api.linkpreview.net",
//         dataType: "jsonp",
//         data: {q: target, key: key},
//       }).then((result) => {
//         result.id = r.id
//         result.user_id = r.user_id
//         result.id = r.id
//         array.push(result)
//         renderResources(array)
//     });
//   });
// }

$(".myresources").click(function() {
  event.preventDefault();
    $.ajax({
        url: "/api/resources/myresources",
        method: "GET",
         }).then(function (resources) {

          renderResources(resources)

          });
});


$(".category").click(function() {
    event.preventDefault();
    const catid = $(this).data('category')
        $.ajax({
        url: `/api/resources/${catid}`,
        method: "GET",
         }).then(function (resources) {
           renderResources(resources)

       });
  });


$(".favourite").click(function() {
    event.preventDefault();
    const resID = $(this).data('resID')
        $.ajax({
        url: `/api/resources/${resID}/like`,
        method: "POST",
         }).then(function (resources) {
           renderResources(resources)

       });
  });



loadResources();

});
