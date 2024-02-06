import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RecipeForm from "./recipeComponent/recipeForm";

const EditRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
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
    const username = JSON.parse(sessionStorage.getItem('userId')).username;

    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setCurrentUser(json);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col m-2">
      <h1 className="font-bold text-center text-xl">
        Edit Recipe To Your Preference
      </h1>
      {!recipe || !currentUser  ? <h1>Loading...</h1>
      : <RecipeForm
      name = {recipe.name}
      description = {recipe.description}
      ingredients = {recipe.ingredients}
      steps = {recipe.steps}
      prepTime = {recipe.prep_time}
      cookingTime = {recipe.cooking_time}
      nutritionalData = {recipe.nutritional_data}
      tags = {recipe.tags}
      image = {recipe.image_url}
      update = {true}
      user = {currentUser._id}
      username = {currentUser.username}
      />}
    </div>
  );
};

export default EditRecipe;
