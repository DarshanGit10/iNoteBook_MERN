const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET ="Some String for secure connection"
// Create user using post method /api/auth/createuser
router.post(
  "/createuser",
  [
    // Data Validation
    body("email", "Enter a Valid Email id").isEmail(),
    body("password", "Enter a Valid password min length req 5").isLength({ min: 5 }),
    body("username", "Enter a Valid Username min length req 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // If errors, return bad req and errors (Email Id Unique)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check user exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Enter a unique Email Id" });
      }
    //   hashing the password
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt) 
      // Add new user if not exists
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
      });
    //   Json Web Token
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken})
    //  send auth token instead of user details
    //   res.json(user);
      //   If any other errors catch will take carry
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Authenticate a user /api/auth/login
router.post(
    "/login",
    [
      // Data Validation
      body("email", "Enter a Valid Email id").isEmail(),
      body("password", "Password cannot be empty").exists(),
    ],
    async (req, res) => {
      // If errors, return bad req and errors (Email Id Unique)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    // Destructing 
    const {email, password} = req.body;
    // Authentication
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error: "Please try to login using correct credentials !!!" });
        }
        // Compare password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login using correct credentials !!!" });
        }
        const payLoad = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(payLoad, JWT_SECRET)
        res.json({authToken})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

module.exports = router;
