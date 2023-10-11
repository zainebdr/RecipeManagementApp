const express = require('express')
const mongoose=require('mongoose')

const app = express()

//app = object of type express , represent our application ,have a usuful method 

//connection to mongo db
mongoose.connect('mongodb://localhost:27017/RecipesMangDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('mongodb connected...')); 

const db=mongoose.connection
db.on('error',(err)=> console.error(err))
db.once('open',()=>{
    console.log("connected")
})

 /*   const { MongoClient } = require('mongodb');

    async function connectToMongoDB() {
      const uri = 'mongodb://localhost:27017/recipesdb'; // Replace with your MongoDB connection URI
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('recipesdb'); // Replace 'recipesdb' with your database name
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
    
module.exports = connectToMongoDB;*/
    


//if port is set ( set PORT = xxxx) for the env production else we use 3000
const port = process.env.PORT || 3000
// ` so we can use a template string  
app.listen(port,()=>{console.log(` Listining on port ${port}..` )}  )