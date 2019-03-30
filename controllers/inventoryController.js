/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = (db) => {
  return {
    search: (req, res) => {
      const query = req.params.query;
      let conditions;
      let search = { where: {} };
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
        //    Literal sequelize query to get all itemIDs containing all tags
        db.sequelize.query(`select inventoryId from (select inventoryId, COUNT(tagId) as myCount  from inventorytag 
        where tagId in (${tagIDs}) GROUP BY inventoryId) as temp 
        where myCount = ${tagIDs.length}`, { type: db.sequelize.QueryTypes.SELECT })
          .then(response => {
            //  if there aren't any items with all these tags return empty
            if (response.length < 1) {
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
      db.Inventory.sync().then(() => {
        return db.Inventory.create({
          itemName: req.body.itemName,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          StoreId: req.body.storeId
        }).then(() => {
          res.status(200).json({ message: 'Inventory Added' });
        }).catch(error => {
          res.status(400).json({ message: error.message });
        });
      });
    },
    updateItem: (req, res) => {
      db.Inventory.update({
        itemName: req.body.itemName,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        StoreId: req.body.storeId
      }, {
        where: { id: req.params.id }
      }).then(() => {
        res.status(200).json({ message: 'Inventory Updated' });
      }).catch(error => {
        res.status(400).json({ message: error.message });
      });
    } //    ,
    // updateTags: (req, res) => {
    //   for (let i = 0; i < req.body.addTags.length; i++) {
    //     db.Inventory_Tags.create({
    //       itemID: req.params.id,
    //     })
    //   }
    // }
  };
};
