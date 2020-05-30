module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: { type: type.STRING, required: true, allowNull: false },
    password: { type: type.STRING },
    username: { type: type.STRING, required: true, allowNull: false },
  }, { schema: 'public', })
}