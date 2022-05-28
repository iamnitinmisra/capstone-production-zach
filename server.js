require('dotenv').config()

const{PORT,NODE_ENV}= process.env;

const express =require('express');
const cors = require ('cors');
const app =express()

app.use(express.json())

const {
 getRecipes,
 saveRecipe,
 deleteRecipe
} = require(`./controller`)

app.get(`/get-recipe/`,getRecipes)
app.post (`/save-recipe/`,saveRecipe)
app.delete(`/delete-recipe/`,deleteRecipe)





const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on port ${3000}`)
})
