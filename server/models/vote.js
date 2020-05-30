module.exports = (sequelize, type) => {
  return sequelize.define('vote', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tagId: {
      type: type.INTEGER, allowNull: false, required: true, references: {
        model: 'tags',
        key: "id"
      }
    },
    userId: {
      type: type.INTEGER, required: true, allowNull: false, references: {
        model: 'users',
        key: "id"
      }
    },
    itemId: {
      type: type.INTEGER, required: true, allowNull: false, references: {
        model: 'items',
        key: "id"
      }
    },
  }, { schema: 'public', })
}
