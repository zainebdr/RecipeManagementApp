//import Mongoose library which is an Object Data Modeling (ODM) library for MongoDB.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
type :String,
required :true ,
unique : true,
lowercase :true},
  password: {
    type :String,
    required :true ,
    minlength:6,
   },
  

},);


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(); //add salt for hashing , a string added to password
  this.password = await bcrypt.hash(this.password, salt);//hashed version of password before save to db
  next();
});


//A Mongoose model is a constructor function that can interact with MongoDB documents in the "Auth" collection following this schema.
module.exports = mongoose.model('user', userSchema);
