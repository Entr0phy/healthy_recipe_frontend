import React, { useState, useEffect } from "react";
import FeedRecipeCard from "./feedRecipeCard";

const MyFeed = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState(null);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("userId"))._id;
    const fetchFeaturedRecipe = async () => {
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
      setFeaturedRecipes(json);
    };

    fetchFeaturedRecipe();
  }, []);

  return (
    <div className="flex flex-col m-2 items-center">
      {!featuredRecipes ? (
        <h1>Loading...</h1>
      ) : (
        featuredRecipes?.query.map((ele) => {
          return (
            <div className="m-2" key={ele._id}>
              <FeedRecipeCard
                image={ele.image_url}
                name={ele.name}
                id={ele._id}
                tag={ele.tags[0]}
                rating={
                  ele.ratings === 0
                    ? "No Ratings"
                    : (ele.ratings / ele.comments.length).toFixed(1)
                }
              />
            </div>
          );
        })
      )
      }
      {featuredRecipes?.query.length === 0 && <h1 className="text-2xl my-4 font-semibold">You Do Not Have Any Recipes</h1>}
    </div>
  );
};

export default MyFeed;
