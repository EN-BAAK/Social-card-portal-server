const { DataTypes } = require("sequelize");

const CustomersModel = (sequelize, modelName) => {
  const Customers = sequelize.define(
    modelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      desc: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      desc_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      show_background_img: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      background_img: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      text_color: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          len: [1, 12],
        },
      },
      background_color_1: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          len: [1, 12],
        },
      },
      background_color_2: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          len: [1, 12],
        },
      },
      button_color: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          len: [1, 12],
        },
      },
      language: {
        type: DataTypes.STRING(2),
        validate: {
          isIn: [["ar", "en", "he"]],
          len: [2],
        },
        allowNull: false,
      },
      template_type: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Customers;
};

module.exports = CustomersModel;
