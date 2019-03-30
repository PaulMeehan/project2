const Inventory = require('./inventory');
const Tag = require('./tag');
const sequelize = require('sequelize');

// module.exports = function (sequelize, DataTypes) {
let InventoryTag = sequelize.define('inventory_tag', {});

//   return InventoryTag;
// };

Tag.belongsToMany(Inventory, {
  through: InventoryTag,
  unique: false
});

Inventory.belongsToMany(Tag, {
  through: InventoryTag,
  unique: false
});
