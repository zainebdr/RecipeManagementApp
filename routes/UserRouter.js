const express = require('express');
const router = express.Router();
const authController=require('../controllers/UserController');


//Login
router.get('/login',authController.login_get);
router.get('/check-email/:email',authController.getEmail);

//signUp
router.post('/signup',authController.signup_post);


// Export the router to be used in app.js.
module.exports=router;