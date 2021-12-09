const { Comment } = require("../models");

const comments = [
  {
    comment_text: "comment 1",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "comment 2",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text:
      "If one advances confidently in the direction of their dreams and endeavors to lead a life as they have imagined.  They will meet with a success unexpected in common hours.",
    user_id: 3,
    post_id: 3,
  },
];

const sComm = () => Comment.bulkCreate(comments);

module.exports = sComm;
