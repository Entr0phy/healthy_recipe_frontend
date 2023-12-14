import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HealthGoals from "../userProfileComponents/healthGoals";
const EditHealthGoals = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [healthGoals1, setHealthGoals1] = useState("");
  const [healthGoals2, setHealthGoals2] = useState("");
  const [healthGoals3, setHealthGoals3] = useState("");
  const [healthGoals4, setHealthGoals4] = useState("");
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId")).username;
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
      json.health_goals.map((item, i) => {
        switch (i) {
          case 0:
            setHealthGoals1(item);
            break;
          case 1:
            setHealthGoals2(item);
            break;
          case 2:
            setHealthGoals3(item);
            break;
          case 3:
            setHealthGoals4(item);
            break;
          default:
            break;
        }
      });
    };

    fetchData();
  }, []);

  const handleHealthGoalChange1 = (e) => {
    setHealthGoals1(e.target.value);
  };

  const handleHealthGoalChange2 = (e) => {
    setHealthGoals2(e.target.value);
  };

  const handleHealthGoalChange3 = (e) => {
    setHealthGoals3(e.target.value);
  };

  const handleHealthGoalChange4 = (e) => {
    setHealthGoals4(e.target.value);
  };

  const saveHealthGoals = async() => {
    const healthGoals = [];
    healthGoals1 === "" ? healthGoals : healthGoals.push(healthGoals1);
    healthGoals2 === "" ? healthGoals : healthGoals.push(healthGoals2);
    healthGoals3 === "" ? healthGoals : healthGoals.push(healthGoals3);
    healthGoals4 === "" ? healthGoals : healthGoals.push(healthGoals4);
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
            healthGoals1={healthGoals1}
            handleHealthGoalChange1={handleHealthGoalChange1}
            healthGoals2={healthGoals2}
            handleHealthGoalChange2={handleHealthGoalChange2}
            healthGoals3={healthGoals3}
            handleHealthGoalChange3={handleHealthGoalChange3}
            healthGoals4={healthGoals4}
            handleHealthGoalChange4={handleHealthGoalChange4}
          />

          <button className="m-2 p-2 bg-teal-200 rounded text-semibold border-2 border-grey-400" onClick={saveHealthGoals}>Update Health Goals</button>
        </>
      )}
    </div>
  );
};

export default EditHealthGoals;
