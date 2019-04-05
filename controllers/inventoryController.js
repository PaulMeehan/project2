/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = (db, authController) => {
  return {

    findOne: (req, res) => {
      const id = req.params.id;
      db.Inventory.findOne({
        where: {
          id: id
        },
        include: [ {
          model: db.Store
        }, {
          model: db.Tag
        }]
      }).then(response => {
        res.json(response);
      }).catch(error => {
        res.json(error);
      });
    },

    search: (req, res) => {
      console.log('got to search');
      const query = req.params.query;
      let conditions;
      let search = {
        where: {},
        include: [{
          model: db.Store
        }, {
          model: db.Tag,
          attributes: ['id', 'description']
        }]
      };
      let where = search.where;
      let tagIDs, storeId, category, price;
      //    if there are no restrictions, just get the database
      if (query) {
        let conditions = query.split('&');
        //    find all parameters passed by the client
        for (let i = 0; i < conditions.length; i++) {
          let statement = conditions[i].split('=');
          switch (statement[0]) {
            case 't':
              tagIDs = statement[1];
              break;
            case 'storeId':
              storeId = statement[1];
              break;
            case 'c':
              category = statement[1];
              break;
            case 'p':
              price = statement[1];
              break;
            default:
              return res.status(400).json({ message: "queries must be of the form '/api/inventory/search/t={tag1},{tag2}&storeId={storeId}&c={category}'", notes: ['All values are optional'] });
              break;
          }
        }
      } else {
        search.limit = 10;
      }

      //    set parameters for sequelize search
      if (storeId) {
        where.storeId = storeId;
      }
      if (category) {
        where.category = category;
      }
      if (price) {
        console.log(price);
      }
      if (tagIDs) {
        const length = tagIDs.split(',').length;
        //    Literal sequelize query to get all itemIDs containing ALL tags
        db.sequelize.query(`select inventoryId from (select inventoryId, COUNT(tagId) as myCount  from InventoryTags 
        where tagId in (${tagIDs}) GROUP BY inventoryId) as temp 
        where myCount = ${length}`, { type: db.sequelize.QueryTypes.SELECT })
          .then(response => {
            //  if there aren't any items with all these tags return empty
            if (response.length < 1) {
              console.log("SENDING EMPTY ARRAY");
              return res.json([]);
            } else {
              const itemIDs = [];
              for (let i = 0; i < response.length; i++) {
                itemIDs.push(response[i].inventoryId);
              }
              where.id = {
                $in: itemIDs
              };
              db.Inventory.findAll(search).then(response => {
                res.json(response);
              }).catch(error => {
                res.json(error);
              });
            }
          });
      } else {
        db.Inventory.findAll(search).then(response => {
          res.json(response);
        }).catch(error => {
          res.json(error);
        });
      }
    },

    createItem: (req, res) => {
    //  only certain logged in users can create items
      authController.getUserStore(req, res, function (storeId) {
        db.Inventory.create({
          itemName: req.body.itemName,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          StoreId: storeId
        }, {
          include: [{
            model: db.Tag
          }]
        }).then(inventory => {
          res.status(200).json(inventory);
        }).catch(error => {
          res.status(400).json({ message: error.message });
          throw error;          
        });
      });
    },

    updateItem: (req, res) => {
      authController.getUserStore(req, res, function (storeId) {
        db.Inventory.update({
          itemName: req.body.itemName,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price
        }, {
          where: {
            id: req.params.id,
            //  Should only be able to update items in your own store
            StoreId: storeId
          }
        }).then(() => {
          res.status(200).json({ message: 'Inventory Updated' });
        }).catch(error => {
          res.status(400).json({ message: error.message });
        });
      });
    },

    deleteItem: (req, res) => {
      authController.getUserStore(req, res, storeId => {
        db.Inventory.destroy({
          where: {
            id: req.params.id,
            StoreId: storeId
          }
        }).then(() => {
          res.status(200).end();
        }).catch(error => {
          res.status(404).json({ message: 'Item not found in your inventory' });
        });
      });
    }
  };
};
