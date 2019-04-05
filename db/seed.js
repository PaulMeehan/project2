module.exports = (db) => {
  db.Store.create({
    storeName: "Emma's Ice Cream Shoppe",
    email: 'emma@ice-shoppe.com'
  }).then(store => {

    db.Inventory.create({
      itemName: '1 Pint Mint Chocolate Chip',
      category: 'ice cream',
      description: 'The best Ice Cream ever made. May contain nuts',
      price: 4.99,
      StoreId: 1
    }).then(inventory => {
      db.Tag.create({
        description: 'ice cream'
      }).then(tag => {
        inventory.setTags([tag]);
        db.Inventory.create({
          itemName: '1 Pint Cookie Dough',
          category: 'ice cream',
          description: 'The 2nd best Ice Cream ever made. May contain nuts',
          price: 4.99,
          StoreId: 1
        }).then(inventory => {
          inventory.setTags([tag]);
        });
      });
    });

    db.User.create({
      firstName: 'Joe',
      lastName: 'Gates',
      email: 'j@g.co',
      password: process.env.ADMIN_USER_PWD,
      isAdmin: true,
      isStore: true,
      StoreId: 1
    });

    db.User.create({
      firstName: 'Jane',
      lastName: 'Jobs',
      email: 'j@j.co',
      password: process.env.USER_PWD,
      isAdmin: false
    });
  });
};
