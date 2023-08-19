
const recipeTitle = document.querySelector(".recipe-title");
const recipeImage = document.querySelector(".recipe-image");
const ingredientList = document.querySelector(".ingredient-list");
const instructionList = document.querySelector(".instruction-list");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  clearRecipe();

  // Fetch random recipe data from Edamam API
  try {
    const response = await fetch(
      "https://api.edamam.com/search?q=chicken&app_id=0d9f24d0&app_key=YOUR_API_KEY"
    );
    const data = await response.json();

    // Update recipe details
    const recipe = data.hits[0].recipe;
    recipeTitle.textContent = recipe.label;
    recipeImage.src = recipe.image;
    displayIngredients(recipe.ingredientLines);
    displayInstructions(recipe.instructions);
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
});

function displayIngredients(ingredients) {
  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientList.appendChild(li);
  });
}

function displayInstructions(instructions) {
  instructions.forEach((instruction, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${instruction}`;
    instructionList.appendChild(li);
  });
}

function clearRecipe() {
  recipeTitle.textContent = "";
  recipeImage.src = "";
  ingredientList.innerHTML = "";
  instructionList.innerHTML = "";
}
