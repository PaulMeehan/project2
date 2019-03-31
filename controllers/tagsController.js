module.exports = (db) => {
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

    findTags: (tagIds, itemId = undefined, storeId = undefined, callback = undefined) => {
      //  match with store
      let storeinclude = {
        model: db.Store
      };
      if (storeId) {
        storeinclude.where = {
          id: storeId
        };
      }
      //    match with item
      let itemInclude = {
        model: db.Inventory
      };
      if (itemId) {
        itemInclude.where = {
          id: itemId
        };
      }
      db.Tag.findAll({
        where: {
          id: {
            $in: req.body.addTags
          }
        },
        include: [
          {
            model: db.Inventory,
            where: {
              id: req.params.id
            },
            include: [
              storeinclude
            ]
          }
        ]
      }).then(tags => {
        callback(tags);
      });
    },

    updateTags: (req, res) => {
      findTags(req, 1, function (tags) {
        for (let i = 0; tags.length; i++) {
          console.log(tags[i]);
        }
        res.json(tags);
      });
    }
  };
};
