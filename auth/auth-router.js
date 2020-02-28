const bcrypt = require("bcryptjs");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "4h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
