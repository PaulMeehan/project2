module.exports = function (sequelize, DataTypes) {
  let Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Store.associate = (models) => {
    Store.hasMany(models.Inventory, {
      onDelete: 'cascade'
    });
  };

  return Store;
};
