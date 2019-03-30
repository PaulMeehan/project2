module.exports = function (sequelize, DataTypes) {
  let Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    itemID_FK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagID_FK: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Tag.associate = (models) => {
  //   Tag.hasMany(models.Inventory, {
  //     onDelete: 'cascade',
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Tag;
};
