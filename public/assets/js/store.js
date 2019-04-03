//api serarch from client side

    // this is supposed to retrieve the data from a search
  

  // this is supposed to post an item to a store
  $('.newItem').click(()=> {
    const newItem = {
      name: $('#itemName').val().trim(),
      category: $('#itemCategory').val().trim(),
      description: $('#itemDescription').val().trim(),
      price: $('#price').val().trim()
    };
    $.ajax('/api/inventory', {
      type: 'POST',
      data: newItem
    }).then(() => {
      console.log('added item' + id);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // this is the delete item section
  $('.delete-item').on('click',(event) => {
    const id = $(this).data('id');

    $.ajax('/api/inventory/' + id, {
      type: 'DELETE'
    }).then(() => {
      console.log('deleted item', id);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // this is the item update section
  $.ajax('/api/inventory/' + id, {
    type: 'PUT',
    data: newItem
  }).then(() => {
    console.log('updated' + id);
    // Reload the page to get the updated list
    location.reload();
  })