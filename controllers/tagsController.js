module.exports = (db) => {
  const InventoryController = require('./inventoryController')(db);
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
      db.Inventory.findOne({
        where: {
          id: req.params.id
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
          res.status(400).json(error);
        });
      }).catch(error => {
        res.status(404).json(error);
      });
    },

    updateTags: (req, res) => {
      let id = parseInt(req.params.id);
      console.log(id);
      db.Inventory.findOne({
        where: {
          id: id
        }
      }).then(item => {
        db.Tag.findAll({
          where: {
            id: {
              $in: req.body.addTags
            }
          }
        }).then(tags => {
          item.addTags(tags, { through: {} });
          db.Tag.findAll({
            where: {
              id: {
                $in: req.body.removeTags
              }
            }
          }).then(tags => {
            item.removeTags(tags,{ through: {}});
            res.json(tags);
          }).catch(error => {
            res.status(404).json(error);
          });
        }).catch(error => {
          res.status(404).json(error);
        });
        
      }).catch(error => {
        res.status(404).json({ message: 'No inventory found' });
      });
    }
  };
};
