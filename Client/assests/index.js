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

async function getRecipes(event) {
  event.preventDefault();
  const ingredients = document.getElementById(`input`).value;
  const res = await axios.get(`http://localhost:4000/recipes/?ingredient=${ingredients}`)
  res.data.forEach(({ recipe }) => {
    const recipeID = recipe.uri.split('#')
    const newRecipe = {
      id: recipeID[1],
      label: recipe.label,
      image: recipe.image,
      ingredients: recipe.ingredientLines,
    }
    makeRecipeCard(newRecipe)
  })
}

async function saveRecipe(recipeID) {
  console.log(recipeID)
  const response = await axios.post(`http://localhost:4000/recipe/`, { recipeID })
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
