import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "./recipeComponent/comment";
import { CiStar } from "react-icons/ci";
import Favorites from "./recipeComponent/favorites";
import Question from "./recipeComponent/question";
import Link from "next/link";
import Image from "next/image";

const RecipeScreen = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [questionToggle, setQuestionToggle] = useState(false);
  const [servingSize, setServingSize] = useState(1);

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

  useEffect(() => {
    const username = JSON.parse(sessionStorage?.getItem("userId"))?.username;

    const fetchData = async () => {
      if (username) {
        const data = await fetch(
          `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
        );
        const json = await data.json();
        setCurrentUser(json);
      }
    };

    fetchData();
  }, []);

  const increase = () => {
    setServingSize((prev) => prev + 1);
  };

  const decrease = () => {
    setServingSize((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const editRecipe = () => {
    router.push(`./editRecipe?recipeId=${router.query.recipeId}`);
  };

  const addToCart = async () => {
    const addToCart = await fetch(
      `${process.env.apiKey}/auth/user/addToGroceryList`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("userId"))._id,
          groceryItems: recipe.ingredients.map((item) => ({
            ...item,
            quantity: item.quantity * servingSize,
            recipeId: router.query.recipeId,
          })),
        }),
      }
    );

    if (addToCart.status === 200) {
      window.alert("Added To Cart");
    } else window.alert("Error, Please try again");
  };

  const share = async () => {
    await navigator.clipboard.writeText(location.href);
    alert("Link has been copied to clipboard");
  };
  if (!recipe)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  else {
    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <button
            className="mx-4 my-3 p-2 font-semibold bg-green-200 rounded"
            onClick={() => {
              router.back();
            }}>
            Back
          </button>
        </div>
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
            <h1 className="font-bold text-xl">
              {recipe.ratings === 0
                ? "No Ratings"
                : (recipe.ratings / recipe.comments.length).toFixed(1)}
            </h1>
            <CiStar size={35} color="#000000" className="mx-2" />

            {sessionStorage.getItem("userId") !== null &&
              JSON.parse(sessionStorage.getItem("userId")).userType !==
                "admin" && <Favorites recipe={router.query.recipeId} />}
            {sessionStorage.getItem("userId") !== null &&
              JSON.parse(sessionStorage.getItem("userId")).userType ===
                "user" && (
                <button
                  className="p-1 border-2 border-grey-200 rounded bg-green-600 text-white"
                  onClick={editRecipe}>
                  Modify Recipe
                </button>
              )}
          </div>
          <div className="m-2">
            <button
              className="p-1 bg-yellow-200 rounded font-semibold border-gray-200 border-2"
              onClick={share}>
              Share Recipe
            </button>
          </div>

          <div className="m-2 font-semibold text-lg flex flex-wrap">
            {recipe.verificationStatus ? (
              <h1 className="text-green-600">Verified</h1>
            ) : (
              <h1 className="text-red-600">Not Verified</h1>
            )}
            <Link
              className="mx-2"
              href={`/userProfile/profilePage?profileId=${recipe?.submitted_by._id}`}>
              Submitted By: {recipe.submitted_by.username}
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <div className="overflow-hidden max-w-md m-2 border-2">
              <Image
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
            <h4 className="font-semibold m-2">{`SERVING: ${servingSize}`} </h4>
            <button
              className="m-1 p-0.5 bg-green-200 rounded"
              onClick={increase}>
              ^
            </button>
            <button className="m-1 p-1 bg-red-200 rounded" onClick={decrease}>
              v
            </button>
          </div>

          <div className="flex flex-col p-2 m-2">
            <div className="flex flex-wrap">
              <h1 className="font-bold text-xl underline mb-2">Ingredients</h1>
              {sessionStorage.getItem("userId") !== null &&
                JSON.parse(sessionStorage.getItem("userId")).userType !==
                  "admin" && (
                  <button
                    className="p-1 border-2 border-grey-200 rounded mx-6 bg-gray-600 text-white"
                    onClick={addToCart}>
                    Add To Cart
                  </button>
                )}
            </div>

            {recipe?.ingredients?.map((ele) => (
              <h4 className="mb-2 font-semibold" key={Math.random()}>
                {`${ele.quantity * servingSize} ${ele.unitOfMeasure} ${
                  ele.ingredientName
                }`}
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

          <div className="mx-4">
            <h1 className="font-bold text-xl">Questions And Comments</h1>
            <div className="flex divide-x divide-gray-200">
              <button
                className={`flex-1 text-center font-semibold text-xl ${
                  !questionToggle ? "bg-gray-400" : ""
                }`}
                onClick={() => setQuestionToggle(false)}>
                Reviews
              </button>
              <button
                className={`flex-1 text-center font-semibold text-xl ${
                  questionToggle ? "bg-gray-400" : ""
                }`}
                onClick={() => setQuestionToggle(true)}>
                Questions
              </button>
            </div>
          </div>

          {!questionToggle ? (
            <Comment
              comments={recipe.comments}
              user={
                sessionStorage.getItem("userId") !== null ? currentUser : null
              }
              recipeId={recipe}
            />
          ) : (
            <h1>
              <Question
                user={
                  sessionStorage.getItem("userId") !== null
                    ? JSON.parse(sessionStorage.getItem("userId"))
                    : null
                }
                recipeId={recipe?._id}
                questions={recipe?.questions}
              />
            </h1>
          )}
        </div>
      </div>
    );
  }
};

export default RecipeScreen;
