const User=require('../models/UserModel')
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
    const { email } = req.query;
    console.log('reeeees');
    const existingUser = User.find({ email: email });
    
    if (existingUser) {
      res.json({ exists: true });
      console.log('exist ',existingUser);
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
    /*  const userWithEmail = await User.find((user) => user.email === email);
      console.log('emaail ',userWithEmail);
        if (userWithEmail) {
          // L'e-mail existe déjà, renvoyer une réponse appropriée (par exemple, un code d'état 409 Conflict)
          return res.status(409).json({ message: 'L\'e-mail existe déjà' });
        }*/
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