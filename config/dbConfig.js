const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "----",
  username: "----",
  password: "----",
  host: "----",
  dialect: "mysql",
  port: 3306,
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
});

const dbConfig = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database & tables created!");
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};

module.exports = {
  dbConfig,
  sequelize,
};
