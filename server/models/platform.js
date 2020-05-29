module.exports = (sequelize, type) => {
  return sequelize.define('Platform', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  }, { schema: 'public', freezeTableName: true, })
}