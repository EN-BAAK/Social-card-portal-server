const { DataTypes } = require("sequelize");

const LinksModel = (sequelize, modelName) => {
  const Links = sequelize.define(
    modelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Links;
};

module.exports = LinksModel;
