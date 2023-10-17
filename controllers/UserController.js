const User= require('../models/UserModel')
const jwt = require('jsonwebtoken');
// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
  }


  // create json web token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret jwt for zaineb', {
    expiresIn: maxAge
  });
};

  // get all login 
  module.exports.login_get = async (req, res) => {
    try { 
        const users = await User.find();
        res.json(users);
      } catch (err) {
        next(err); // Pass the error to the error handler
      }  };

 // Route for checking if an email exists
  module.exports.getEmail= async (req, res) => {
  try {
    const email = req.params['email'];
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
     
      const token = createToken(existingUser._id);
      res.json({ exists: true , jwt:token });
        } else {
      res.json({ exists: false });
      console.log('not exist',existingUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

  //post signup
  module.exports.signup_post = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newuser = new User({ email, password });
      const savedUser = await newuser.save();

      //create token
      const token = createToken(savedUser._id);
      console.log('token ', token);
      //httponly : cause we cannt change it from front app
      //expire after 3 days
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
      //res.status(201).json({ user: savedUser._id });
      res.json(savedUser);
    } catch (err) {
      next(err); // Pass the error to the error handler
    }
  };

  
  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    console.log(email, password);
    res.send('user login');
  }