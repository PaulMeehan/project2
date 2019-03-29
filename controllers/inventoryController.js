module.exports = (db) => {
  return {
    searchTags: (req, res) => {
      let conditions = req.params.query.parse('&');
      let tagID = '(';
      for (let i = 0; i < conditions.length; i++) {
        let statement = conditions[i].parse('=');
        switch (statement[0]) {
          case 't':
            tagID += statement[1];
            break;
          default:
            break;
        }
      }
      tagID += ')';
    //   db.Inventory_Tags.findAll({
    //     include: [
    //       {
    //         model: db.Inventory
    //       }
    //     ]

    //   })
    },
    createItem: (req, res) => {
      db.Inventory.sync().then(() => {
        return db.Inventory.create({
          storeID: req.body.storeID,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price
        }).then(() => {
          res.status(200).json({ message: 'Inventory Added' });
        }).catch(error => {
          res.status(400).json({ message: error.message });
        });
      });
    },
    updateItem: (req, res) => {
      db.Inventory.update({
        storeID: req.body.storeID,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price
      }, {
        where: { id: req.params.id }
      }).then(() => {
        res.status(200).json({ message: 'Inventory Updated' });
      }).catch(error => {
        res.status(400).json({ message: error.message });
      });
    }//,
    // updateTags: (req, res) => {
    //   for (let i = 0; i < req.body.addTags.length; i++) {
    //     db.Inventory_Tags.create({
    //       itemID: req.params.id,
          
    //     })
    //   }
    // }
  };
};
