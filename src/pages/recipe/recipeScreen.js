import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
  else {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center items-center">
          <div className="overflow-hidden max-w-md m-2 border-2">
            <img
              className="items-center justify-center"
              src={recipe.image_url}
            />
          </div>
        </div>
        <h1 className="text-center font-bold text-xl">{recipe.name.toUpperCase()}</h1>
        <div className=" m-4">
          <div className="flex flex-wrap">
            <h2 className="p-2 m-2 font-bold">Tags</h2>
            {recipe.tags.map((ele) => (
              <h4 className="p-2 m-2 border-2 border-grey-400 rounded font-semibold">
                {ele}
              </h4>
            ))}
          </div>

          <div>
            <div className="flex flex-wrap">
              <h4 className="font-bold p-2 m-2">Nutritional Data</h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">{`Calories: ${recipe.nutritional_data.calories}`} </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">{`Carbohydrates: ${recipe.nutritional_data.carbohydrates}`} </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">{`Fat: ${recipe.nutritional_data.fat}`} </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">{`Sodium: ${recipe.nutritional_data.sodium}`} </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">{`Protein: ${recipe.nutritional_data.protein}`} </h4>
            </div>
          </div>

          <div className="flex flex-wrap p-2">
              <h4 className="font-semibold m-2">{`PREP TIME: ${recipe.prep_time}`}</h4>
              <h4 className="font-semibold m-2">{`COOK TIME: ${recipe.cooking_time}`}</h4>
              <h4 className="font-semibold m-2">{`SERVING: 1`}</h4>
          </div>

          <div className="flex flex-col p-2 m-2">
            <h1 className="font-bold text-xl underline mb-2">Ingredients</h1>
            {recipe.ingredients.map((ele)=> <h4 className="mb-2 font-semibold">{ele}</h4>)}
          </div>

          <div className="flex flex-col p-2 m-2">
            <h1 className="font-bold text-xl underline mb-2">Steps</h1>
            {recipe.steps.map((ele, i)=> <h4 className="mb-2 font-semibold">{`${i+1}: ${ele}`}</h4>)}
          </div>

        </div>
      </div>
    );
  }
};

export default RecipeScreen;
