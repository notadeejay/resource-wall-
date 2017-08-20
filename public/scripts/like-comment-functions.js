$(() => {

//OPEN AND RENDER COMMENT BOX
  $('#grid').on('click', '.commentsbox', function(e) {
    e.preventDefault();
    let $this = $(this)
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
            <input type=submit class="btn btn-info submit" data-resid="${$this.data('resource')}"></button></div>
            </form>`,
            width: 500,
            transition: "elastic"
         });
     });
  });

  //ADD NEW COMMENT
  $(document).on ('submit', '#addcomment', function(event) {
    event.preventDefault();
    let data = $(this).serialize()
    let resid = $(this).children('.submit').data('resid')
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
            <input type=submit class="btn btn-info submit" data-resid="${resid}"></button></div>
            </form>`,
            width: 500,
            transition: "elastic"
         });
      });
   })

  //DYANICALLY RENDER COMMENTS
  const generateComments = (obj) => {
    const html = `<span class = "comments">${obj.comment}</span> <br>`;
    return html;
  }

 //RENDER COMMENTS
  const renderInfo = (data) => {
    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateComments)
              .join('')
   return html
  }




  //FAVOURITE A RESOURCE
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

});