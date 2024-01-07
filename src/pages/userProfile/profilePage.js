import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import RecipeSearch from "../recipe/recipeComponent/recipeSearch";

const ProfilePage = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [myRecipe, setMyRecipe] = useState(null);
  useEffect(() => {
    if (!router.isReady) return;
    const userId = router.query.profileId;
    fetch(`${process.env.apiKey}/auth/user/getUserById/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${process.env.apiKey}/recipe/myFeed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMyRecipe(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, router.query.profileId]);

  return (
    <div className="flex flex-col">
      {!userProfile ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="text-center m-4 text-3xl font-bold">
            {userProfile.username} Profile Page
          </h1>

          <div className="m-2 border-2 border-gray-400 rounded p-2">
            <label className="m-2 font-semibold text-xl">Health Goals</label>
            {userProfile.health_goals.map((ele) => (
              <h1 key={Math.random()} className="m-2">
                {ele}
              </h1>
            ))}
          </div>

          <div className="m-2 border-2 border-gray-400 rounded p-2">
          <label className="m-2 font-semibold text-xl">{userProfile.username} Recipes</label>
                {myRecipe?.query.map((ele) => (
                    <Link
                    key={ele._id}
                    href={`/recipe/recipeScreen?recipeId=${ele._id}`}>
                    <RecipeSearch
                      name={ele.name}
                      image={ele.image_url}
                      tags={ele.tags}
                      description={ele.description}
                    />
                  </Link>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
