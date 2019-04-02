module.exports = function (sequelize, DataTypes) {
  let Mapclick = sequelize.define('Mapclick', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Mapclick;
};
