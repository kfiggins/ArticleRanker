"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ASSOCIATIONS
db.platform.hasMany(db.item)
db.user.hasMany(db.item)
db.user.hasMany(db.tag)
db.item.hasMany(db.vote)
db.tag.hasMany(db.vote)
db.user.hasMany(db.vote)

db.tag.belongsTo(db.user)
db.item.belongsTo(db.platform)
db.item.belongsTo(db.user)
db.vote.belongsTo(db.item)
db.vote.belongsTo(db.tag)
db.vote.belongsTo(db.user)


module.exports = db;
