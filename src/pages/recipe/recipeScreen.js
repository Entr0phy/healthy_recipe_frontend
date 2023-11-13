import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RecipeScreen = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const recipeId = router.query.recipeId;
    fetch(`${process.env.apiKey}/recipe/getById/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.recipe[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, router.query.recipeId]);

  if (!recipe)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  else{
    return(
        <div className="flex flex-col">
            <h1>{recipe.name}</h1>
            <h1>{recipe.description}</h1>
            <h1>{recipe.ingredients}</h1>
            <h1>{recipe.steps}</h1>
            <h1>{recipe.cooking_time}</h1>
            <h1>{recipe.meal_type}</h1>
            <h1>{recipe.nutritional_data.calories}</h1>
        </div>
    )
  }
};

export default RecipeScreen;
