 let recipe =[]

 let favorites=[]
 module.exports={
    getRecipes: (req,res)=> res.status(200).send(recipe),
    deleteRecipe: (req, res)=> {
        let index = recipe.findIndex(elem => elem.id===+req.params.id)
        recipe.splice(index,1)
        res.status(200).send (recipe)
    },
     saveRecipe:(req,res)=>{
         const {recipe} = req.body
         console.log(recipe)
         res.status(200).send(recipe)
     }
 }
