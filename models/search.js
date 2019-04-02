module.exports = function (sequelize, DataTypes) {
  let Search = sequelize.define('Search', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Search;
};
