import React, { useState, useEffect } from "react";
import Link from "next/link";
import RecipeSearch from "../recipe/recipeComponent/recipeSearch";

const VerifyRecipe = () => {
  const [notVerifiedRecipes, setNotVerifiedRecipes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/recipe/notVerifiedRecipe`
      );
      const json = await data.json();
      setNotVerifiedRecipes(json.getNotVerifiedRecipe);
    };
    fetchData();
  }, []);

  const verifyRecipe = async (recipeId, userId) => {
    const verifyRecipe = await fetch(
      `${process.env.apiKey}/recipe/verifyRecipe`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recipeId,
          userId: userId
        }),
      }
    );

    if (verifyRecipe.status === 200) {
      window.alert("Recipe Verified!");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  return (
    <div className="flex flex-col">
      {!notVerifiedRecipes ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-center m-2 font-bold text-2xl">
            Review Recipes that have yet to be verified
          </h1>

          {notVerifiedRecipes.map((recipe) => (
            <div key={recipe._id} className="m-2">
              <Link
                key={recipe._id}
                href={`/recipe/recipeScreen?recipeId=${recipe._id}`}>
                <RecipeSearch
                  name={recipe.name}
                  image={recipe.image_url}
                  tags={recipe.tags}
                  description={recipe.description}
                />
                {console.log(recipe.submitted_by)}
              </Link>
              <button className="m-2 bg-green-200 rounded font-semibold p-2" onClick={()=> verifyRecipe(recipe._id, recipe.submitted_by._id)}>
                Verify
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default VerifyRecipe;
