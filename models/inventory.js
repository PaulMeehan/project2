module.exports = function (sequelize, DataTypes) {
  let Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    storeID: {
      type: DataTypes.INTEGER,
      allowNull: false
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

  // Inventory.associate = (models) => {
  //   Inventory.hasMany(models.Tag, {
  //     onDelete: 'cascade'
  //   });
  // };

  return Inventory;
};
