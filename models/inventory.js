module.exports = function (sequelize, DataTypes) {
  let Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT(6, 2),
      allowNull: true
    }
  });

  Inventory.associate = function (models) {
    Inventory.belongsToMany(models.Tag, {
      through: 'InventoryTag',
      foreignKey: 'inventoryId'
    });
    Inventory.Store = Inventory.belongsTo(models.Store, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Inventory;
};
