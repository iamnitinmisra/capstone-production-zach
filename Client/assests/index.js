const recipeContainer = document.querySelector(`#recipes`);

const recipes = [];
const favorites = [];

const form = document.querySelector("form");

const baseURL = `https://api.edamam.com/search?app_id=d83bf513&app_key=fd37e0b3a9047b1936db99f0ad3c1171&q=`;

function makeRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
console.log(typeof recipe.id)
  recipeCard.innerHTML = `
  <p class= "label">${recipe.label}</p>
  <img alt='recipe cover image' src='${recipe.image}'/>
  <p class="ingredients">${recipe.ingredients}</p>
  <div class= "save-btn">
  <button onclick="saveRecipe('${recipe.id}')">Save</button>
  </div>
  `

  recipeContainer.appendChild(recipeCard);
}
// <button onclick='deleteRecipes(${recipe})'>Delete</button>

function getRecipes(event) {
  event.preventDefault();
  const ingredients = document.getElementById(`input`).value;
  axios
    .get(baseURL + ingredients.replaceAll(` `, `%20`))
    .then((res) => {
      res.data.hits.forEach(({ recipe }) => {
        // saveRecipe(http://www.edamam.com/ontologies/edamam.owl#recipe_b1957a6a4025b25f6da6aef1fad452d4)
      const recipeID = recipe.uri.split('#')
        const newRecipe = {
          id: recipeID[1],
          label: recipe.label,
          image: recipe.image,
          ingredients: recipe.ingredientLines,
        };

        makeRecipeCard(newRecipe);
        //  recipes.push(newRecipe)
      });
    })
    .catch((error) => console.log(error));
}

 async function saveRecipe(recipe) {
   const response = await axios.post(`http://localhost:3000/save-recipe/`,recipe)
   console.log(response.data)
  
}
// i know this is wrong
async function deleteRecipe(recipe) {
  const responses = await axios.delete(
    `http://localhost:3000/delete-recipe/`,
    recipe
  );
  console.log(responses.data);
}
form.addEventListener(`submit`, getRecipes);
