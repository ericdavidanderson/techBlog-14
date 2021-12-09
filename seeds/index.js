const sUser = require("./userSeeds");
const sPost = require("./postSeeds");
const sComm = require("./commSeeds.js");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await sUser();
  await sPost();
  await sComm();
  process.exit(0);
};

seedAll();
