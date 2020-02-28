const bcrypt = require("bcryptjs");

const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
