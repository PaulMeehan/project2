module.exports = (db) => {

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

  db.Tag.create({
    description: 'bike'
  });
  db.Tag.create({
    description: 'outdoors'
  });
  db.Tag.create({
    description: 'exercise'
  });
  db.Tag.create({
    description: 'health'
  });
  db.Tag.create({
    description: 'indoors'
  });
  db.Tag.create({
    description: 'water'
  });

  db.Store.create({
    storeName: 'Bobs Bike Rack',
    email: 'bobsmith@xmail.com',
    hours: '9:00 - 5:00 Mon-Sat',
    address: '123 Main St. Durham NC 27715',
    url: 'www.bobsbikerack.com'
  }).then(store => {
    db.Inventory.create(
      {
        itemName: 'Schwinn S150',
        category: 'touring',
        description: '27 inch, 12 speed touring bike',
        price: 175.00,
        StoreId: 1
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 1,
          tagId: 1
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 1,
          tagId: 2
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 1,
          tagId: 3
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'Roadmaster',
        category: 'mountain',
        description: '24 inch girls mountain bike',
        price: 78.00,
        StoreId: 1
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 2,
          tagId: 1
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 2,
          tagId: 2
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 2,
          tagId: 3
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'Huffy Parkside SE',
        category: 'crusing',
        description: 'Mens 7 speed comfort bike',
        price: 148.00,
        StoreId: 1
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 3,
          tagId: 1
        }
      );
    });
  });

  db.Store.create({
    storeName: 'Outdoor Adventures',
    email: 'adventuresawait@xmail.com',
    hours: '9:00 - 9:00 Mon-Fri, 9:00 - 6:00 Sat',
    address: '33 Clark St. Cary NC 27519',
    url: 'www.outdooradventures.com'
  }).then(store => {
    db.Inventory.create(
      {
        itemName: 'Hobie Mirage Pro Angler 14',
        category: 'kayaks',
        description: 'Exreme fishing utility with 6 horizontal rod lockers',
        price: 500.00,
        StoreId: 2
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId:4,
          tagId: 2
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 4,
          tagId: 6
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'Ace Tec Performer',
        category: 'paddle boards',
        description: 'Bic Ace Tec Performer',
        price: 879.00,
        StoreId: 2
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 5,
          tagId: 2
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 5,
          tagId: 6
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'Schwinn S150',
        category: 'bikes',
        description: '27 inch, 12 speed mens touring bike',
        price: 158.00,
        StoreId: 2
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 6,
          tagId: 1
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 6,
          tagId: 2
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 6,
          tagId: 4
        }
      );
    });
  });

  db.Store.create({
    storeName: 'Health And Fitness',
    email: 'haf@xmail.com',
    hours: '6:00 - 5:00 Mon-Sat',
    address: '100 Kildaire Farms Rd. Cary NC 27511',
    url: 'www.healthandfitness.com'
  }).then(store => {
    db.Inventory.create(
      {
        itemName: 'True Fitness Recumbent Bike PS50',
        category: 'stationary bikes',
        description: 'Durable stationary bike accommodates users of all fitness levels',
        price: 2200.00,
        StoreId: 3
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 7,
          tagId: 1
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 7,
          tagId: 5
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'TRX Home Kit',
        category: 'Suspension trainers',
        description: 'TRXHOMEKIT uses body weight and gravity to perform over 300 exercises',
        price: 175.00,
        StoreId: 3
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 8,
          tagId: 3
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 8,
          tagId: 4
        }
      );
    });
    db.Inventory.create(
      {
        itemName: 'Garmin vivosmart',
        category: 'health trackers',
        description: 'Activity tracker plus smart notifications',
        price: 275.00,
        StoreId: 3
      }
    ).then(inventory => {
      db.InventoryTag.create(
        {
          inventoryId: 9,
          tagId: 3
        }
      );
      db.InventoryTag.create(
        {
          inventoryId: 9,
          tagId: 4
        }
      );
    });
  });
};
