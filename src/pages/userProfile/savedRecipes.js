import React, { useState, useEffect } from "react";
import Link from "next/link";
import RecipeSearch from "../recipe/recipeComponent/recipeSearch";
import { useRouter } from "next/router";
const MyReviews = () => {
  const [favorite_recipes, setFavoriteRecipes] = useState(null);
  const router = useRouter();
  const homePage = () => router.push("./userProfileScreen");
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId")).username;
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserFavRecipe/${username}`
      );
      const json = await data.json();
      setFavoriteRecipes(json.favorite_recipes);
    };

    fetchData();
  }, []);

  const removeFromFavorites = async (recipeId) => {
    const removeFromFav = await fetch(
      `${process.env.apiKey}/auth/user/removeFromFav`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("userId"))._id,
          recipeId: recipeId,
        }),
      }
    );

    if (removeFromFav.status === 200) {
      window.alert("Removed From Favorites");
    } else window.alert("Error, Please try again");
  };

  return (
    <div className="flex flex-col m-7 my-10">
      <h1 className="text-xl font-bold">MY SAVED RECIPES</h1>
      {!favorite_recipes ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mx-2 my-10 border-2 border-gray-600 p-2 rounded">
          {favorite_recipes.length === 0 && (
            <h1 className="text-center font-semibold text-xl">
              No Saved Recipes
            </h1>
          )}
          {favorite_recipes.map((ele) => (
            <>
              <Link
                key={ele._id}
                href={`../recipe/recipeScreen?recipeId=${ele._id}`}>
                <RecipeSearch
                  image={ele.image_url}
                  name={ele.name}
                  description={ele.description}
                />
              </Link>
              <button
                className="font-semibold p-2 border-2 rounded my-2 bg-red-100"
                onClick={() => removeFromFavorites(ele._id)}>
                Remove From Favorite
              </button>
            </>
          ))}
        </div>
      )}
      <div>
        <button
          className="p-2 bg-zinc-100 border-2 rounded font-semibold m-2"
          onClick={homePage}>
          Back to Settings
        </button>
      </div>
    </div>
  );
};

export default MyReviews;
