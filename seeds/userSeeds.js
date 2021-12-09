const { User } = require("../models");

const userSeed = [
  {
    username: "John",
    password: "jkohn",
  },
  {
    username: "Jake",
    password: "jake",
  },
  {
    username: "Joe",
    password: "joe",
  },
];

const sUser = () => User.bulkCreate(userSeed);

module.exports = sUser;
