module.exports = (db, authController) => {
  return {
    //  findTagsbyDescription
    searchTags: (req, res) => {
      const query = req.params.query || '';
      console.log(query);
      db.Tag.findAll({
        where: {
          description: {
            $like: `%${query}%`
          }
        }
      }).then(tags => {
        res.status(200).json(tags);
      }).catch(error => {
        res.status(400).json(error);
      });
    },

    addTag: (req, res) => {
      const tagName = req.body.tagName;
      console.log(req.body);
      authController.getUserStore(req, function (storeId) {
        db.Inventory.findOne({
          where: {
            id: req.params.id,
            StoreId: storeId
          },
          include: [{
            model: db.Tag,
            through: {
              attributes: ['createdAt']
            }
          }]
        }).then(item => {
          db.Tag.create({
            description: tagName
          }).then(tag => {
            item.addTag(tag, { through: {} });
            res.json(tag);
          }).catch(error => {
            // throw error;
            res.status(400).json(error);
          });
        }).catch(error => {
          // throw error;
          res.status(404).json(error);
        });
      });
    },

    updateTags: (req, res) => {
      let id = parseInt(req.params.id);
      authController.getUserStore(req, function (storeId) {
        db.Inventory.findOne({
          where: {
            id: id,
            StoreId: storeId
          }
        }).then(item => {
          db.Tag.findAll({
            where: {
              id: {
                $in: req.body['addTags[]']
              }
            }
          }).then(tags => {
            item.addTags(tags, { through: {} });
            db.Tag.findAll({
              where: {
                id: {
                  $in: req.body['removeTags[]']
                }
              }
            }).then(tags => {
              item.removeTags(tags, { through: {} });
              res.json(tags);
            }).catch(error => {
              // throw error;
              res.status(404).json(error);
            });
          }).catch(error => {
            // throw error;
            res.status(404).json(error);
          });
        }).catch(error => {
          // throw error;
          res.status(404).json({ message: 'No inventory found' });
        });
      });
    }
  };
};
