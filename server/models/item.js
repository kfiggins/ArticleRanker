module.exports = (sequelize, type) => {
  return sequelize.define('item', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    platformId: {
      type: type.INTEGER, allowNull: false, required: true, references: {
        model: 'platforms',
        key: "id"
      }
    },
    createdById: {
      type: type.INTEGER, required: true, allowNull: false, references: {
        model: 'users',
        key: "id"
      }
    },
    name: { type: type.STRING, required: true, allowNull: false },
    description: { type: type.TEXT },
    link: { type: type.STRING, required: true, allowNull: false },
  }, { schema: 'public', })
}
