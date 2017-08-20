const generateHTML = (obj) => {
  const html = `
     <div class ="grid-item">
        <article data-owner="${obj.user_id}" class="resource">
                <div class = 'articleHeader'>
                    <h5>${obj.title}</h5>
                    <a href='#'><i class="add material-icons" id="delete" data-resID='${obj.id}'>close</i></a>
                </div>
                <a href="${obj.url}" target="_blank">
                <div class = 'articleBody'>
                  <img src="${obj.image}">
                </div>
                </a>
                <div class = 'articleFooter clearfix'>
                   <a href='#' class='favourite' id='R${obj.id}' data-resID='${obj.id}'><i class="like material-icons">favorite</i></a>
                   <a href='#' class="commentsbox" data-resource='${obj.id}'><span><i class="add material-icons">insert_comment</i></span></a>
                </footer>
            </article>
        </div>`
  return html;
}



$(() => {


//LOAD ALL RESOURCES ON HOMEPAGE SELECT
  $('.all').click(function(event){
    loadResources();
  })

  const checkLikes = () => {
    let likes = JSON.parse(localStorage.getItem('favourites'));
      for (var i = 0; i < likes.length; i++) {
        if (likes[i].value == true) {
           $('#R'+ likes[i].id).children('.like').addClass("liked")
        }
      }
   }

//LOAD ALL RESOURCES
  const loadResources = () => {
    $.ajax({
        method: "GET",
        url: "/api/resources/resources"
      }).then((resources) => {
         renderResources(resources)
         checkLikes();
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
            checkLikes()
            });
    $('#search').animate({width: 'toggle'});
  });

  //DISPLAY RESOURCES AS GRID
  $('.grid').isotope({
      layoutMode: 'cellsByRow',
      itemSelector: '.grid-item',
      cellsByRow: {
        columnWidth: 400,
        rowHeight: 400
      }
    });

//ANIMATED SEARCH BAR
  $('#searchButton').click(function() {
    $('#search').animate({width: 'toggle'});

  })

//RENDER RESOURCES DYNAMICALLY
  const renderResources = (data) => {
    $('#grid').html('');
    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateHTML)
              .join('')
    $('#grid').html(html)
  }


 //LOAD RESOURCES BY OWNER
  $(".myresources").click(function() {
    event.preventDefault();
    $.ajax({
      url: "/api/resources/myresources",
      method: "GET",
    }).then(function (resources) {
      renderResources(resources)
      checkLikes();
    });
  });


 //LOAD RESOURCE BY CATEGORY
  $(".category").click(function() {
    event.preventDefault();
    const catid = $(this).data('category')
    $.ajax({
      url: `/api/resources/${catid}`,
      method: "GET",
    }).then(function (resources) {
     renderResources(resources)
     checkLikes();
   });
  });


 //LOAD FAVOURITE RESOURCES
  $(".faves").click(function() {
    event.preventDefault();
    $.ajax({
      url: `/api/likes/favourite`,
      method: "GET",
    }).then(function (resources) {
     renderResources(resources)
     checkLikes();
   });
  });


//LOAD MOST LIKED RESOURCES
  $(".topfaves").click(function() {
    event.preventDefault();
    $.ajax({
      url: `/api/likes/top`,
      method: "GET",
    }).then(function (resources) {
      renderResources(resources)
      checkLikes();
   });
  });



//VIEW DELETE BUTTON
  $(document).on('mouseenter mouseleave', '.resource', function (event) {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    let userID = $(this).data('owner')
      if(user == userID) {
        $(this).find("#delete").toggle()
      }
  });


//DELETE RESOURCE
  $(document).on('click', '#delete', function (event) {
    const resid = $(this).data('resid')
    const user = JSON.parse(localStorage.getItem('currentUser'))
   $.ajax({
    url: `api/resources/${resid}/${user}`,
    method: 'DELETE',
    data: user
   }).then(function (resources) {
     renderResources(resources)
     checkLikes()
   })
});


loadResources();

});





