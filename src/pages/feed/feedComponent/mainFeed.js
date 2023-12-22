import React, { useState, useEffect } from "react";
import FeedRecipeCard from "./feedRecipeCard";

const MainFeed = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState(null);

  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      const data = await fetch(`${process.env.apiKey}/recipe/reconmendedRecipe`);
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
      )}
    </div>
  );
};

export default MainFeed;
