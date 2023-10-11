const express = require('express');

const mongoose = require('mongoose');
const recipesRouter=require('./routes/RecipesRoutes')

//app = object of type express , represent our application ,have a usuful method 
const app = express()

//add middleware
app.use(express.json())

app.use((req,res,next)=>{
    //res.status(404)
    //res.send("erooor not found")
    const err =new Error("Not found");
    err.status=404;
    //when we call next and we pass err then the error handler will be called    
    next(err);
});

// Error handler middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });

//if port is set ( set PORT = xxxx) for the env production else we use 3000
const port = process.env.PORT || 3000
// ` so we can use a template string  
app.listen(port,()=>{console.log(` Listining on port ${port}..` )}  )


//connection to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/RecipesMangDb', { useNewUrlParser: true, useUnifiedTopology: true }); 
const db=mongoose.connection
db.on('error',(err)=> console.error(err));
db.once('open',()=>{
    console.log("connected")
});

app.use('/api/recipes', recipesRouter);
