let btn = window.parent.frames['header'].document.querySelector("#searchBtn");
let recipeContainer = window.parent.frames['main'].document.getElementById("recipeContainer");
btn.onclick = function(event) {
    event.preventDefault();
    let searchQuery = window.parent.frames['header'].document.getElementById("searchInput").value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                recipeContainer.innerHTML = '';
                let meal = data.meals[0];
                let recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe');
                let recipeImage = document.createElement('img');
                recipeImage.src = meal.strMealThumb;
                let recipeTitle = document.createElement('h3');
                recipeTitle.innerText = meal.strMeal;
                let recipeId = document.createElement('p');
                recipeId.innerHTML = `<strong>Recipe ID:</strong> ${meal.idMeal}`;
                let ingredientsHeading = document.createElement('h4');
                ingredientsHeading.innerText = 'Ingredients';
                let ingredientsList = document.createElement('ul');
                for (let i = 1; i <= 20; i++) {
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];
                    if (ingredient) {
                        let listItem = document.createElement('li');
                        listItem.innerText = `${ingredient} - ${measure}`;
                        ingredientsList.appendChild(listItem);
                    }
                }
                let viewRecipeBtn = document.createElement('a');
                viewRecipeBtn.href = meal.strSource || '#';
                viewRecipeBtn.innerText = "View Recipe";
                viewRecipeBtn.classList.add('viewRecipeBtn');
                viewRecipeBtn.target = "_blank";
                recipeCard.appendChild(recipeImage);
                recipeCard.appendChild(recipeTitle);
                recipeCard.appendChild(recipeId);
                recipeCard.appendChild(ingredientsHeading);
                recipeCard.appendChild(ingredientsList);
                recipeCard.appendChild(viewRecipeBtn);
                recipeContainer.appendChild(recipeCard);
            } else {
                recipeContainer.innerHTML = "<p>No recipe found!</p>";
            }
        })
        .catch(error => {
            console.log(error);
        });
};
