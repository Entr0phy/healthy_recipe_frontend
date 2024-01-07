import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HealthGoals from "../userProfileComponents/healthGoals";
const EditHealthGoals = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [healthGoals1, setHealthGoals1] = useState(false);
  const [healthGoals2, setHealthGoals2] = useState(false);
  const [healthGoals3, setHealthGoals3] = useState(false);
  const [healthGoals4, setHealthGoals4] = useState(false);
  const [healthGoals5, setHealthGoals5] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId")).username;
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
      json.health_goals?.map((item, i) => {
        switch (item) {
          case "Lose Weight":
            setHealthGoals1(true);
            break;
          case "Gain Muscle":
            setHealthGoals2(true);
            break;
          case "Lower Blood Pressure":
            setHealthGoals3(true);
            break;
          case "Reduce Blood Sugar":
            setHealthGoals4(true);
            break;
          default:
            setHealthGoals5(true)
            break;
        }
      });
    };

    fetchData();
  }, []);

  const loseWeightChange = () => {
    healthGoals1 === false ? setHealthGoals1(true) : setHealthGoals1(false);
  };

  const gainMuscle = () => {
    healthGoals2 === false ? setHealthGoals2(true) : setHealthGoals2(false);
  };

  const lowerBloodPressure = () => {
    healthGoals3 === false
      ? setHealthGoals3(true)
      : setHealthGoals3(false);
  };

  const reduceBloodSugar = () => {
    healthGoals4 === false
      ? setHealthGoals4(true)
      : setHealthGoals4(false);
  };

  const lowerCholesterol = () => {
    healthGoals5 === false
      ? setHealthGoals5(true)
      : setHealthGoals5(false);
  };

  const saveHealthGoals = async() => {
    const healthGoals = [];
    healthGoals1 === false ? healthGoals : healthGoals.push("Lose Weight");
    healthGoals2 === false ? healthGoals : healthGoals.push("Gain Muscle");
    healthGoals3 === false ? healthGoals : healthGoals.push("Lower Blood Pressure");
    healthGoals4 === false ? healthGoals : healthGoals.push("Reduce Blood Sugar");
    healthGoals5 === false ? healthGoals : healthGoals.push("Lower Cholesterol");
    const update = await fetch(
      `${process.env.apiKey}/auth/user/updateUserHealthGoals`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          health_goals: healthGoals,
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

  return (
    <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-center font-2xl font-semibold">
            Edit Health Goals
          </h1>
          <HealthGoals
            loseWeightState={healthGoals1}
            loseWeightChange={loseWeightChange}
            gainMuscleState={healthGoals2}
            gainMuscle={gainMuscle}
            lowerBloodPressureState={healthGoals3}
            lowerBloodPressure={lowerBloodPressure}
            reduceBloodSugarState={healthGoals4}
            reduceBloodSugar={reduceBloodSugar}
            lowerCholesterolState = {healthGoals5}
            lowerCholesterol= {lowerCholesterol}
          />

          <button className="m-2 p-2 bg-zinc-100 rounded text-semibold border-2 border-grey-400" onClick={saveHealthGoals}>Update Health Goals</button>
        </>
      )}
    </div>
  );
};

export default EditHealthGoals;
