import React, { useState, useEffect } from "react";
import Dieraty from "../userProfileComponents/dietary";
import { useRouter } from "next/router";
const DietaryPreference = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dietaryPreference, setDietaryPreference] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem('userId')).username

    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
    };

    fetchData();
  }, []);

  const handleDietaryChangeVegetarian = (e) => {
    setDietaryPreference(["vegetarian"]);
  };

  const handleDietaryChangeVegan = (e) => {
    setDietaryPreference(["vegan"]);
  };

  const handleDietaryChangePescatarian = (e) => {
    setDietaryPreference(["pescatarian"]);
  };

  const handleDietaryChangeNothing = (e) => {
    setDietaryPreference(["None"]);
  };

  const updatePreferences = async () => {
    const update = await fetch(
      `${process.env.apiKey}/auth/user/updateUserDietary`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          dietary_preferences: dietaryPreference,
        }),
      }
    );

    if (update.status === 200) {
      alert("Your preferences have been updated!");
      router.push("/userProfile/editPreference");
    } else {
      window.alert("Please try again");
    }
  };

  return (
    <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {!userInfo ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="m-2 text-2xl font-semibold text-gray-600 text-center">
            Edit Dietary Preference
          </h1>

          <Dieraty
            handleDietaryChangeVegetarian={handleDietaryChangeVegetarian}
            handleDietaryChangeVegan={handleDietaryChangeVegan}
            handleDietaryChangePescatarian={handleDietaryChangePescatarian}
            handleDietaryChangeNothing={handleDietaryChangeNothing}
          />

          <div className="flex flex-wrap">
            <h4 className="font-semibold">
              Current: {userInfo.dietary_preferences}
            </h4>
            <h4 className="font-semibold mx-2">{"---------> "}</h4>
            <h4 className="font-semibold text-red-500">
              New: {dietaryPreference ? dietaryPreference : "No Preference"}
            </h4>
          </div>

          <div className="text-center">
            <button
              className="m-2 p-2 border-2 rounded bg-zinc-100 font-semibold borer-grey-400"
              onClick={updatePreferences}>
              Confirm Change
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DietaryPreference;
