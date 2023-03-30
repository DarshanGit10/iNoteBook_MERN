const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("username").isLength({ min: 3 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => {console.log(err),
      res.json({error : "Enter a unique Email Id", message : err.message})});
  }
);

module.exports = router;
