module.exports = function (sequelize, DataTypes) {
  let Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  return Item;
};
