const { DataTypes } = require("sequelize");

const SocialMediaModel = (sequelize, modelName) => {
  const SocialMedias = sequelize.define(
    modelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      show_link: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return SocialMedias;
};

module.exports = SocialMediaModel;
