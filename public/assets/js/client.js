let tags = [];
$(document).ready(function () {
  console.log('hello');
  $('#tag-search-button').click((event) => {
    console.log('clicked');
    event.preventDefault();
    const newSearch = $('#product-search').val();
    const query = '/api/tags/' + newSearch;
    console.log(query);
    $.ajax(query, {
      type: 'GET'
    }).then(response => {
      console.log('searching');
      // Reload the page to get the updated list
      console.log(response);
      $("#all-tags").html('');
      for (let i = 0; i < response.length; i++) {
        //only make new tag if you don't already have that tag
        if (!tags.includes(response[i].id)) {
          let newTag = $('<button>').text(response[i].description);
          newTag.attr('data-value', response[i].id);
          newTag.addClass('tag unselected');
          $('#tags').append(newTag);
        }
      }
    });
  });

  $('#item-search').click((event) => {
    event.preventDefault();
    let query = '/api/inventory/search/t='
    query += tags.join(",");
    $.get(query).then(response => {
        console.log(response);
    });
  });
});

$(document).on('click', '.unselected', function () {
  let button = $(this);
  button.removeClass('unselected');
  button.addClass('selected');
  $('#selected-tags').append(button);
  tags.push(button.attr('data-value'));
});

$(document).on('click', '.selected', function () {
  let button = $(this);
  button.removeClass('selected');
  button.addClass('unselected');
  $('#all-tags').append(button);
  tags = tags.filter(e => e !== button.attr('data-value'));
});