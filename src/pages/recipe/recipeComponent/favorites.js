import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useRouter } from 'next/router'

const Favorites = (props) => {
  const [userFavoriteRecipe, setUserFavoriteRecipe] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("userId") === null) return;
    const username = JSON.parse(sessionStorage.getItem("userId")).username;
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserFavoriteRecipe(json.favorite_recipes);
    };

    fetchData();
  }, []);
  const addToFavorite = async () => {
    const addToFav = await fetch(`${process.env.apiKey}/auth/user/addToFav`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: JSON.parse(sessionStorage.getItem("userId"))._id,
        recipeId: router.query.recipeId,
      }),
    });

    if (addToFav.status === 200) {
      window.alert("Added To Favorites");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  const removeFromFavorites = async () => {
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
          recipeId: router.query.recipeId,
        }),
      }
    );

    if (removeFromFav.status === 200) {
      window.alert("Removed From Favorites");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  return (
    <>
      {!userFavoriteRecipe ? (
        <h1> </h1>
      ) : userFavoriteRecipe.includes(props.recipe) ? (
        <>
        <CiHeart size={35} color="#ff0000" fill="red" />
        <button className="font-bold m-1 text-red-600" onClick={removeFromFavorites}>Remove Favorite</button>
        </>
      ) : (
        <button
          className="p-1 border-2 border-grey-200 rounded bg-gray-600 text-white"
          onClick={addToFavorite}>
          Add To Favorite
        </button>
      )}
    </>
  );
};

export default Favorites;
