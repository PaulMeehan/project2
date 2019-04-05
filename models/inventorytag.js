
module.exports = (sequelize, DataTypes) => {
  let InventoryTag = sequelize.define('InventoryTag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  });

  return InventoryTag;
};
