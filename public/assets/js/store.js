const tagList = {};
//   // this is supposed to post an item to a store
$(document).on('click', '.newItem', () => {
  const newItem = {
    itemName: $('#new-name').val().trim(),
    category: $('#new-category').val().trim(),
    description: $('#new-description').val().trim(),
    price: $('#new-price').val().trim()
  };
  $.ajax('/api/inventory', {
    type: 'POST',
    data: newItem
  }).then(item => {
    console.log('added item' + item.id);
    // Reload the page to get the updated list
    location.reload();
  });
});

//   // this is the delete item section
$(document).on('click', '.delete-item', (event) => {
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
  tagList[id] = {
    currentTags: $('#update-tags' + id).attr('data-currenttags').split(','),
    addTags: [''],
    removeTags: ['']
  };
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

//  Searching for Tags
$(document).on('search', '.tag-search', event => {
  let tag = $(event.target).val().trim();
  let id = $(event.target).attr('data-item');
  let currentTags = tagList[id].currentTags;
  let addTags = tagList[id].addTags;
  $.get('/api/tags/' + tag).then(response => {
    for (let i = 0; i < response.length; i++) {
      let tagId = response[i].id;
      //  only add the button if it's not already selected
      console.log(tagId);
      if (!currentTags.includes(tagId) && !addTags.includes(tagId)) {
        let newTag = $("<button class = 'tag unselected'>").text(response[i].description);
        newTag.attr('data-item', id);
        newTag.attr('data-tag', tagId);
        $('new-tags' + id).html('');
        $('#new-tags' + id).append(newTag);
      } else {
        console.log(currentTags.includes(tagId));
      }
    }

    // Creating a new tag option
    $('#addTag' + id).removeClass('hidden');
  });
});

// Adding new Tags
$(document).on('click', '.addTag', event => {
  let itemId = $(event.target).attr('data-item');
  let tagName = $('#search' + itemId).val().trim();
  $.ajax('/api/tags/' + itemId, {
    type: 'post',
    data: {
      tagName: tagName
    }
  }).then(response => {
    // add new tag to existing tags
    let tagId = response.id;
    tagList[itemId].currentTags.push(tagId);
    let newTag = $("<button class = 'tag current'>").text(response.description);
    newTag.attr('data-item', itemId);
    newTag.attr('data-tag', tagId);
    $('#current-tags' + itemId).append(newTag);
  });
});

//  Updating Tags
$(document).on('click', '.unselected', event => {
  let itemId = $(event.target).attr('data-item');
  let tagId = $(event.target).attr('data-tag');
  $(event.target).removeClass('unselected');
  let addTags = tagList[itemId].addTags;
  let removeTags = tagList[itemId].removeTags;
  //  if it's a tag we were going to remove, just remove it from the list
  if (removeTags.includes(tagId)) {
    removeTags = removeTags.filter(e => e !== tagId);
    tagList[itemId].removeTags = removeTags;
    // $('#update-tags' + itemId).attr('data-addtags', removeTags.join(','));
    $(event.target).addClass('current');
  } else {
    //  it's a tag we want to add
    addTags.push(tagId);
    tagList[itemId].addTags = addTags;
    // $('#update-tags' + itemId).attr('data-addtags', addTags.join(','));
    $(event.target).addClass('selected');
  }
  $('#current-tags' + itemId).append($(event.target));
});

//  Removing Tags
$(document).on('click', '.selected', event => {
  let itemId = $(event.target).attr('data-item');
  let tagId = $(event.target).attr('data-tag');
  //  change class to appropriate one
  $(event.target).removeClass('selected');
  $(event.target).addClass('unselected');

  //  remove it from the list of tags to be added
  let addTags = tagList[itemId].addTags;
  addTags = addTags.filter(e => e !== tagId);
  // $('#update-tags' + itemId).attr('data-addtags', addTags.join(','));
  tagList[itemId].addTags = addTags;
  //  change location
  $('#new-tags' + itemId).append($(event.target));
});
$(document).on('click', '.current', event => {
  let itemId = $(event.target).attr('data-item');
  let tagId = $(event.target).attr('data-tag');
  //  change class to appropriate one
  $(event.target).removeClass('current');
  $(event.target).addClass('unselected');

  //  remove it from the list of tags to be added
  tagList[itemId].removeTags.push(tagId);
  // removeTags.push(tagId);

  // $('#update-tags' + itemId).attr('data-removetags', removeTags.join(','));

  //  change location
  $('#new-tags' + itemId).append($(event.target));
});

//  Update Tags
$(document).on('click', '.update-tags', event => {
  let itemId = $(event.target).attr('data-item');
  let newTags = tagList[itemId].addTags;
  let oldTags = tagList[itemId].removeTags;
  let body = {
    addTags: newTags,
    removeTags: oldTags
  };
  console.log(body);
  $.ajax('/api/tags/' + itemId, {
    type: 'put',
    data: body
    // contentType: 'application/json; charset=utf-8'
  }).then(() => {
    location.reload();
  });
});
