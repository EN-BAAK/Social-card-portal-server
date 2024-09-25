"use strict";

const { dbConfig, sequelize } = require("../config/dbConfig");
const UserModel = require("./User")(sequelize, "User");
const LinksModel = require("./Links")(sequelize, "Links");
const CustomersModel = require("./Customers")(sequelize, "Customers");
const SocialMediasModel = require("./SocialMedias")(sequelize, "SocialMedias");

CustomersModel.hasMany(LinksModel, {
  foreignKey: "customerId",
  onDelete: "CASCADE",
  as: "links",
});
LinksModel.belongsTo(CustomersModel, { foreignKey: "customerId" });

SocialMediasModel.hasMany(LinksModel, {
  foreignKey: "mediaId",
  onDelete: "CASCADE",
});
LinksModel.belongsTo(SocialMediasModel, { foreignKey: "mediaId" });

const initializeDatabase = async () => {
  await dbConfig();
};

initializeDatabase();
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
module.exports = {
  User: UserModel,
  Customers: CustomersModel,
  SocialMedias: SocialMediasModel,
  Links: LinksModel,
};
