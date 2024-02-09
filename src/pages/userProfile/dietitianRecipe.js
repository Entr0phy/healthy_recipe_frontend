import { useState, useEffect } from "react";
import Link from "next/link";
import RecipeSearch from "../recipe/recipeComponent/recipeSearch";
import { useRouter } from "next/router";

const DietitianRecipe = () => {
  const [myRecipe, setMyRecipe] = useState(null);
  const [average, setAverage] = useState(null);
  const router = useRouter();
  const homePage = () => router.push("./userHome");
  const getAverage = (sum, length) =>
    sum === 0 || length === 0 ? 0 : sum / length;
  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("userId"))._id;
    const getDietitianRecipe = async () => {
      const data = await fetch(`${process.env.apiKey}/recipe/myFeed`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const json = await data.json();
      setMyRecipe(json);
      const totalRatings = json.query.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          getAverage(currentValue.ratings, currentValue.comments.length)
        );
      }, 0);
      setAverage((totalRatings / json.query.length).toFixed(1));
    };

    getDietitianRecipe();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-center m-2 font-bold text-3xl">
        Welcome to your Recipes Listing
      </h1>
      {!myRecipe ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col m-2 p-2 border-2">
          {myRecipe?.query.length > 0 ? (
            <>
              <h1 className="text-center font-bold text-green-600 m-2">
                Average Recipe Rating : {average}/5
              </h1>
              {myRecipe?.query.map((recipe) => (
                <Link
                  key={recipe._id}
                  href={`/recipe/recipeScreen?recipeId=${recipe._id}`}>
                  <RecipeSearch
                    name={recipe.name}
                    image={recipe.image_url}
                    tags={recipe.tags}
                    description={recipe.description}
                  />
                </Link>
              ))}
            </>
          ) : (
            <h1 className="text-center font-bold text-red-600 m-2">No Recipe Created Yet</h1>
          )}
        </div>
      )}
      <div>
      <button className="p-2 bg-zinc-100 border-2 rounded font-semibold m-2" onClick={homePage}>Back to Settings</button>
      </div>
    </div>
  );
};

export default DietitianRecipe;
