import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Allergies from "../userProfileComponents/allergies";
const EditAllergies = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId")).username;
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
      setAllergies(json.allergies);
    };

    fetchData();
  }, []);

  const saveAllergy = async() => {
    const update = await fetch(
      `${process.env.apiKey}/auth/user/updateUserAllergies`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          allergies: allergies,
        }),
      }
    );

    if (update.status === 200) {
      alert("Your preferences have been updated!");
      router.push("/userProfile/editPreference");
    } else {
      window.alert("Please try again");
    }
  }

  const pushToAllergyArray = (val) => {
    setAllergies((current) => [...new Set([...current, val])]);
  };

  const removeFromAllergyArray = (val) => {
    setAllergies((current) => {
      return current.filter((allergies) => allergies !== val);
    });
  };

  return (
    <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-center font-2xl font-semibold">Edit Allergies</h1>

          <div className="mt-1">
            <Allergies
              parentAllergy={allergies}
              setParentAllergy={pushToAllergyArray}
              removeParentAllergy={removeFromAllergyArray}
            />
          </div>

          <button className="m-2 p-2 bg-teal-200 font-semibold rounded border-2 border-grey-400" onClick={saveAllergy}>Save Allergies</button>
        </>
      )}
    </div>
  );
};

export default EditAllergies;
