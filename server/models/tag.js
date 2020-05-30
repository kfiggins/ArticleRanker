module.exports = (sequelize, type) => {
  return sequelize.define('tag', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdById: {
      type: type.INTEGER, required: true, allowNull: false, references: {
        model: 'users',
        key: "id"
      }
    },
    name: { type: type.STRING, required: true, allowNull: false, unique: true },
  }, { schema: 'public', })
}
