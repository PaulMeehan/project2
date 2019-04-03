//  View Tags
// $(document).ready(function () {

//   // this is supposed to post an item to a store
//   $('.newItem').click(() => {
//     const newItem = {
//       name: $('#itemName').val().trim(),
//       category: $('#itemCategory').val().trim(),
//       description: $('#itemDescription').val().trim(),
//       price: $('#price').val().trim()
//     };
//     $.ajax('/api/inventory', {
//       type: 'POST',
//       data: newItem
//     }).then(() => {
//       console.log('added item' + id);
//       // Reload the page to get the updated list
//       location.reload();
//     });
//   });

//   // this is the delete item section
$('.delete-item').on('click', (event) => {
  const id = $(event.target).attr('data-item');

  $.ajax('/api/inventory/' + id, {
    type: 'DELETE'
  }).then(() => {
    console.log('deleted item', id);
    // Reload the page to get the updated list
    location.reload();
  });
});

$(document).on('click', '.view-tags', (event) => {
  let id = $(event.target).attr('data-item');
  console.log($(event.target));
  let tagDiv = $('#tag-div' + id);
  tagDiv.removeClass('hidden');
});

$(document).on('click', '.update-item', (event) => {
  const id = $(event.target).attr('data-item');
  console.log($('#description' + id));
  const newItem = {
    itemName: $('#name' + id).val().trim(),
    category: $('#category' + id).val().trim(),
    description: $('#description' + id).val().trim(),
    price: $('#price' + id).val().trim()
  };
  $.ajax('/api/inventory/' + id, {
    type: 'PUT',
    data: newItem
  }).then(() => {
    console.log('updated' + id);
    // Reload the page to get the updated list
    location.reload();
  });
});
