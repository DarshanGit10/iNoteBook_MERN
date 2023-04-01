const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
require('dotenv').config();
// const JWT_SECRET ="Some String for secure connection"


// Route1 Login not req
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
    const authToken = jwt.sign(data,String(process.env.JWT_SECRET))
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


// Route2 Login not req
// Authenticate a user /api/auth/login POST method
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
        const authToken = jwt.sign(payLoad, String(process.env.JWT_SECRET))
        res.json({authToken})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


  // Route3 Login  req
  // Get User details /api/auth/getuser POST method

  router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;
