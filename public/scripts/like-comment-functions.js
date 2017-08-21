$(() => {

//OPEN AND RENDER COMMENT BOX
  $('#grid').on('click', '.commentsbox', function(e) {
  e.preventDefault();
  let $this = $(this)
  let data = $(this).data('resource')
   $.ajax ({
     url:`/api/comments/${data}`,
     method: "GET",
   }).then((results) => {
        $.colorbox({
          html: `<div id='editCard' onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';">
          <div class='commentheader'>
            <h2>comments</h2>
            </div>
            <div class='commentsRender'>
              ${renderInfo(results)}
            </div>
            <div class='commentFooter'>
          <form role="form" id="addcomment">
          <input class='styledForm' placeholder='enter comment' type=text name="usercomment">
          <input type=submit class="btn submit" data-resid="${$this.data('resource')}"></div></button></div>
          </form>`,
          width: 500,
          transition: "elastic"
       });
   });

});

  //ADD NEW COMMENT
  $(document).on ('submit', '#addcomment', function(event) {
  event.preventDefault();
  let data  = $(this).serialize()
  let resid = $(this).children('.submit').data('resid')

    $.ajax({
      url: `/api/comments/${resid}`,
      method: 'POST',
      data: data
    }).then((results) => {
      $.colorbox({
          html: `<div id='editCard' onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';">
          <div class='commentheader'>
            <h2>comments</h2>
            </div>
            <div class='commentsRender'>
              ${renderInfo(results)}
            </div>
            <div class='commentFooter'>
          <form role="form" id="addcomment">
          <input type=text class='styledForm' placeholder='enter comment' name="usercomment">
          <input type=submit class="btn submit" data-resid="${results[0].resource_id}"></div></button></div>
          </form>`,
          width: 500,
          transition: "elastic"
       });
   });
 })


  //DYANICALLY RENDER COMMENTS
  const generateComments = (obj) => {
  const html = `
              <div class = "comments">${obj.comment}</div>`;
  return html;
}

 //RENDER COMMENTS
  const renderInfo = (data) => {
    let html = data
              .sort((a,b) => b.id - a.id)
              .map(generateComments)
              .join('<br />')
   return html

}




  //FAVOURITE A RESOURCE
  $(document).on ('click', '.favourite', function(event) {
    event.preventDefault();

    const resid = $(this).data('resid')
    const $this = $(this)
    const favs  = [];

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
        }).then((resources) => {

           });

    } else {

        $.ajax({
          url: `/api/likes/${resid}`,
          method: 'DELETE'
        }).then((response) => {

           });
      }
  });

});