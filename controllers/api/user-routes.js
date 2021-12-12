const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbUser) => res.json(dbUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },

      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No post by this id found." });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })

    .then((dbUser) => {
      req.session.save(() => {
        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        req.session.loggedIn = true;

        res.json(dbUser);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(400).json({ message: "username does not exist." });
        return;
      }
      const validPassword = dbUser.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "This password is incorrect." });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        req.session.loggedIn = true;

        res.json({ user: dbUser, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUser) => {
      if (!dbUser[0]) {
        res.status(404).json({ message: "user id not found" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
