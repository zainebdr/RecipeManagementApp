const express = require('express')
//app = object of type express , represent our application ,have a usuful method 
const app = express()

//add middleware
app.use(express.json())
const recipes= [
    {id:1,name:'recipes 1 '},
    {id:2,name:'recipes 2 '},
    {id:3,name:'recipes 3 '},
   
   
];

//contains path and function 
app.get('/',(req,res)=>{
    console.log("hello world!")
    //callback function also call route handler
    res.send('hello world!!!!!')
})

//get all recipes
app.get('/api/recipes',(req,res)=>{
    res.send(recipes)
})

//get a specific recipe by id
app.get('/api/recipes/:id',(req,res)=>{
   const recipe= recipes.find(c=>c.id===parseInt(req.params.id));
   if (!recipe) return res.status(404).send('The id of given recipe was not found');
   //otherwise
   res.send(recipe)
})


//create a new recipe
app.post('/api/recipes',(req,res)=>{
    const recipe={
        id:recipes.length+1,
        name:req.body.name
    }
    //add it to the array
    recipes.push(recipe)  
    res.send(recipe)
})

//update an existant recipe
app.put('/api/recipes/:id',(req,res)=>{
    //look up the recipe is exist or not
    const  recipe= recipes.find(c=>c.id===parseInt(req.params.id));
    if (!recipe) return res.status(404).send('The recipe with the given  id was not found')
    recipe.name=req.body.name;
    res.send(recipe);
})

//delete a recipe
app.delete('/api/recipes/:id',(req,res)=>{
    //look up the recipe is exist or not
    const  recipe= recipes.find(c=>c.id===parseInt(req.params.id));
    if (!recipe) return res.status(404).send('The recipe with the given  id was not found')
    const index =recipes.indexOf(recipe)
    recipes.splice(index,1)
    res.send(recipe)
    
})

//if port is set ( set PORT = xxxx) for the env production else we use 3000
const port = process.env.PORT || 3000;
// ` so we can use a template string  
app.listen(port,()=>console.log(` Listining on port ${port}..` ))