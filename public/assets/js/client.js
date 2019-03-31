$(document).ready(function () {
    
    const newSearch = {
		  itemName: itemName,
          category: category,
          description: description,
          price: price
        }
    
    const newItem = {
        name: $("#itemName").val().trim(),
        category: $("#itemCategory").val().trim(),
        description: $("#itemDescription").val().trim(),
        price: $("#price").val().trim()
    };
    
    //this is supposed to retrieve the data from a search
    $("button").click(function(event) {
        $.ajax("/api/inventory/search", {
            type: "GET",
            data: newSearch
          }).then(() => {
            console.log("searching");
            // Reload the page to get the updated list
            location.reload();
          });
        });

    //this is supposed to post an item to a store
    $(".newItem").click(function () {
        $.ajax("/api/inventory/search" {
            type: "POST",
            data: newItem 
          }).then(() => {
            console.log("added item" + id);
            // Reload the page to get the updated list
            location.reload();
          });
    });
        
    //this is the delete item section
    $(".delete-item").on("click", function(event) {
            const id = $(this).data("id");

            $.ajax("/api/inventory/search" + id, {
                type: "DELETE"
              }).then(() => {
                console.log("deleted item", id);
                // Reload the page to get the updated list
                location.reload();
        });
    });

    //this is the item update section
    $.ajax("/api/inventory/search" + id, {
        type: "PUT",
        data: newItem
      }).then(() => {
        console.log("updated" + id);
        // Reload the page to get the updated list
        location.reload();
      });
})   