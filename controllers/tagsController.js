module.exports = (db) => {
  return {
    //  findTagsbyDescription
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
