let tags = [];
const mapSrc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAPoB0qxu8vfVb1NJ0ZrrLIUHaiyOZcJWg&q=';
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
      $('#all-tags').html('');
      for (let i = 0; i < response.length; i++) {
        // only make new tag if you don't already have that tag
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
    $('#inventory-body').html('');
    let query = '/api/inventory/search/t=';
    query += tags.join(',');
    $.get(query).then(response => {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        let newItem = $('<tr>');
        let store = response[i].Store;
        newItem.append($('<td>').text(response[i].itemName));
        newItem.append($('<td>').text(response[i].category));
        newItem.append($('<td>').text(response[i].price));
        newItem.append($('<td>').text(store.storeName));
        newItem.addClass('itemRow');
        newItem.attr('data-id', response[i].id);
        $('#inventory-body').append(newItem);
        let newRow = $("<tr class = 'itemInfo hidden'>").attr('id', 'itemInfo' + response[i].id);

        let description = $('<td colspan=2>').append($('<p class = desc>').html('<strong>Description: </strong>' + response[i].description));
        let storeInfo = $('<td colspan=2>').append($('<h3>').text('Store Info'));
        storeInfo.append($("<p class = 'address' data-toggle='modal' data-target='#mapModal'></p>").html('<strong>Address: </strong>' + store.address).attr('data-address', store.address));
        storeInfo.append($('<p>').html('<strong>Email: </strong>' + store.email));
        storeInfo.append($('<p>').html('<strong>Hours: </strong>' + store.hours));
        storeInfo.append($('<a>').text('Website').attr('href', store.url));

        newRow.append(description);
        newRow.append(storeInfo);
        $('#inventory-body').append(newRow);
      }
    });
  });
});

//  Tags
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

//  Inventory
$(document).on('click', '.itemRow', function () {
  let id = $(this).attr('data-id');
  let info = $('#itemInfo' + id);
  if (info.hasClass('hidden')) {
    info.removeClass('hidden');
  } else {
    info.addClass('hidden');
  }
});

// Map modal
$(document).on('click', '.address', function () {
  console.log('maybe change so it goes to the map');
  let address = $(this).attr('data-address');
  $('#map').attr('src', mapSrc + address);
});


// on click scroll to inventory
$(document).on('click', function () {
  $('#item-search').click(function () {
    $('html, body').animate({
      scrollTop: $('.inventory').offset().top
    }, 1000);
  });
});

// // Map modal title
// $(document).on('click', '.address', function () {
//   let title = $(this).text(response[i].storeName)
//   $('#MapModalTitle').attr(title)
// });

// Go to store site FOR VERSION 2.0 SINCE URL'S ARE NOT REAL!!!
// $(document).on('click', '#go-to-store', function () {
//   let url = $(this).attr('href');
//   $('#go-to-store').attr('src', url);
// });
