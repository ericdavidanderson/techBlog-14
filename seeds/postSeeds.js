const { Post } = require("../models");

const postSeed = [
  {
    title: "Some information",
    content:
      "Seeds are a great way to start a database.",
    user_id: 1,
  },
  {
    title: "Some more information",
    content: "A lot of people like the idea of working from home.",
    user_id: 2,
  },
  {
    title: "Even more infor",
    content: "What percentage of posts made are helpful to other people?",
    user_id: 3,
  },
];

const sPost = () => Post.bulkCreate(postSeed);

module.exports = sPost;
