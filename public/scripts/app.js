const generateHTML = (obj) => {
  const html = `
      <div class ="grid-item">
        <article data-owner="${obj.user_id}" class="resource">
                <div class = 'articleHeader'>
                    <h5>${obj.title}</h5>
                    <a href='#'><i class="add material-icons" id="delete" data-resID='${obj.id}'>close</i></a>
                    <p>test</p>
                </div>
                <a href="${obj.url}" target="_blank">
                <div class = 'articleBody'>
                  <img src="http://eskipaper.com/images/modern-wallpaper-8.jpg">
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
        window.location.href = "/resources"
        getCurrentUser();
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
      getCurrentUser();
    });
  });

const getCurrentUser = () => {
  $.ajax({
    url: "/api/users",
    method: "GET"
  }).then(function (result) {
    localStorage.setItem("currentUser", JSON.stringify(result))
  })
}

$()

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


const checkLikes = () => {
  let likes = JSON.parse(localStorage.getItem('favourites'));
       for (var i = 0; i < likes.length; i++) {
          if (likes[i].value == true) {
            $('#R'+ likes[i].id).children('.like').addClass("liked")
           }
        }
}

const loadResources = () => {
$.ajax({
    method: "GET",
    url: "/api/resources/resources"
  }).then((resources) => {
     // generatePreview(resources)
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


//EDIT PROFILE
$("#edit").on("submit", function(event) {
  let data = $(this).serialize();
  $("#edit").trigger("reset");
  swal("Good job!", "Your profile has been updated", "success")
  event.preventDefault();
  $.ajax({
    url: "/api/users/edit",
    method: "PUT",
    data: data,
  }).then(function (resources) {

  })
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
  $('#grid').html(html)
}


$('#grid').on('click', '.commentsbox', function(e) {
  e.preventDefault();
  let data = $(this).data('resource')
   $.ajax ({
     url:`/api/comments/${data}`,
     method: "GET",
   }).then(function (results) {

        $.colorbox({
          html: `<div id='editCard'>
          <h4>comments</h4><br />${renderInfo(results)}
          <form role="form" id="addcomment">
          <input type=text name="usercomment">
          <input type=submit class="btn btn-info"></button></div>
          </form>`,     // generateInfo(obj)
          width: 500,
          transition: "elastic"
       });
   });

});

$(document).on ('submit', '#addcomment', function(event) {
  event.preventDefault();
  let data = $(this).serialize()
  let resid = $('.commentsbox').data('resource')

    $.ajax({
      url: `/api/comments/${resid}`,
      method: 'POST',
      data: data
    }).then(function (results){
         $.colorbox({
          html: `<div id='editCard'>
          <h4>comments</h4><br />${renderInfo(results)}
          <form role="form" id="addcomment">
          <input type=text name="usercomment">
          <input type=submit class="btn btn-info"></button></div>
          </form>`,     // generateInfo(obj)
          width: 500,
          transition: "elastic"
       });
    })
})

const generateComments = (obj) => {
  const html = `
              <span class = "comments">${obj.comment}</span> `;
  return html;
}

const renderInfo = (data) => {
    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateComments)
              .join('')
   return html

}


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
          checkLikes();

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
           checkLikes();

       });
  });

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



$(document).on('mouseenter mouseleave', '.resource', function (event) {
   let user = JSON.parse(localStorage.getItem('currentUser'))
   let userID = $(this).data('owner')

   if(user[0].id == userID) {
    $(this).find("#delete").toggle()
   }

});

$(document).on('click', '#delete', function (event) {
  const resid = $(this).data('resid')
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const userID = user[0].id

   $.ajax({
    url: `api/resources/${resid}/${userID}`,
    method: 'DELETE',
    data: user[0].id
   }).then(function (resources) {

   })

});





$(document).on ('click', '.favourite', function(event) {
    event.preventDefault();
    const resid = $(this).data('resid')
    const $this = $(this)
    const favs = [];
   $this.children('.like').toggleClass('liked')

    $('.favourite').each(function () {
     let fav = {
            id: $(this).data('resid'),
            value: $(this).children('.like').hasClass('liked')
          };
        favs.push(fav);
      });

    localStorage.setItem("favourites", JSON.stringify(favs));

    let likes = JSON.parse(localStorage.getItem('favourites'));


    if ($(this).children('.like').hasClass('liked')) {
        $.ajax({
        url: `/api/likes/${resid}`,
        method: "POST",
         }).then(function (resources) {

       });
    } else {
        $.ajax({
          url: `/api/likes/${resid}`,
          method: 'DELETE'
        }).then(function (response) {

      });
    }

  });



loadResources();
});





