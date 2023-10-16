const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const recipesRouter=require('./routes/RecipesRoutes');
const userRouter=require('./routes/UserRouter');
const cors = require('cors'); // Import the cors middleware : allowing requests from any origin. 
const cookieParser = require('cookie-parser');
 
//app = object of type express , represent our application ,have a usuful method 
const app = express()
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

//add middleware
app.use(express.json())
app.use(cookieParser());




//connection to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/RecipesMangDb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Mongodb connected....')});
const db=mongoose.connection
db.on('error',(err)=> console.error(err));
db.once('open',()=>{
    console.log("DB open connected")
});


app.use('/api/recipes', recipesRouter);
app.use(userRouter);


//404 handler and pass to error handler
app.use((req,res,next)=>{
   /* const err =new Error("Not found");
    err.status=404;
    //when we call next and we pass err then the error handler will be called    
    next(err);*/
    next(createError(404, 'Not found'));
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


// cookies read and get 
// cookies
app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});

