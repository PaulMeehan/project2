module.exports = function (sequelize, DataTypes) {
  let Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Inventory, {
      through: 'InventoryTag',
      foreignKey: 'tagId',
      onDelete: 'cascade'
    });
  };

  return Tag;
};
