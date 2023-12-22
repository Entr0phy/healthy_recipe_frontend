import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "./recipeComponent/comment";
import { CiStar } from "react-icons/ci";

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

  const addToCart = async () => {
    const addToCart = await fetch(`${process.env.apiKey}/auth/user/addToGroceryList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: JSON.parse(sessionStorage.getItem("userId"))._id,
        groceryItems: recipe.ingredients
      }),
    })

    if (addToCart.status === 200) {
      window.alert("Added To Cart");
    } else window.alert("Error, Please try again");
  }

  if (!recipe)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  else {
    return (
      <div className="flex flex-col">
        <h1 className="font-bold text-xl mx-6 my-2">
          {recipe.name.toUpperCase()}
        </h1>

        <div className=" mx-4">
          <div className="flex flex-wrap">
            <h2 className="mx-2 font-bold">Tags</h2>
            {recipe?.tags?.map((ele) => (
              <h4
                className="p-2 mx-2 border-2 border-grey-400 rounded font-semibold"
                key={Math.random()}>
                {ele}
              </h4>
            ))}
          </div>

          <div className="mx-2 my-2 flex flex-wrap">
              <h1 className="font-bold text-xl">{recipe.ratings === 0 ? "No Ratings" : (recipe.ratings/recipe.comments.length).toFixed(1)}</h1>
              <CiStar size={35} color="#000000" className="mx-2"/>
          </div>

          <div className="flex justify-center items-center">
            <div className="overflow-hidden max-w-md m-2 border-2">
              <img
                className="items-center justify-center"
                src={recipe.image_url}
                alt="Recipe image"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap">
              <h4 className="font-bold p-2 m-2">Nutritional Data</h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">
                {`Calories: ${recipe.nutritional_data.calories}`}{" "}
              </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">
                {`Carbohydrates: ${recipe.nutritional_data.carbohydrates}`}{" "}
              </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">
                {`Fat: ${recipe.nutritional_data.fat}`}{" "}
              </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">
                {`Sodium: ${recipe.nutritional_data.sodium}`}{" "}
              </h4>
              <h4 className="font-semibold m-2 p-2 border-2 border-grey-400 rounded">
                {`Protein: ${recipe.nutritional_data.protein}`}{" "}
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap p-2">
            <h4 className="font-semibold m-2">{`PREP TIME: ${recipe.prep_time}`}</h4>
            <h4 className="font-semibold m-2">{`COOK TIME: ${recipe.cooking_time}`}</h4>
            <h4 className="font-semibold m-2">{`SERVING: 1`}</h4>
          </div>

          <div className="flex flex-col p-2 m-2">
            {sessionStorage.getItem("userId") !== null && 
            <div className="flex flex-wrap">
              <h1 className="font-bold text-xl underline mb-2">Ingredients</h1>
              <button className="p-1 border-2 border-grey-200 rounded mx-6 bg-gray-600 text-white" onClick={addToCart}>Add To Cart</button>
            </div>
            }
            
            {recipe?.ingredients?.map((ele) => (
              <h4 className="mb-2 font-semibold" key={Math.random()}>
                {`${ele.quantity} ${ele.unitOfMeasure} ${ele.ingredientName}`}
              </h4>
            ))}
          </div>

          <div className="flex flex-col p-2 m-2">
            <h1 className="font-bold text-xl underline mb-2">Steps</h1>
            {recipe?.steps?.map((ele, i) => (
              <h4 className="mb-2 font-semibold" key={Math.random()}>{`${
                i + 1
              }: ${ele}`}</h4>
            ))}
          </div>

          <Comment
            comments={recipe.comments}
            user={sessionStorage.getItem("userId") !== null ? JSON.parse(sessionStorage.getItem("userId"))._id : null}
            recipeId={recipe._id}
          />
        </div>
      </div>
    );
  }
};

export default RecipeScreen;
