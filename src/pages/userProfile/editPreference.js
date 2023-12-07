import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";
import EditPreferenceCard from "./userProfileComponents/editPreferenceCard";
const UserScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser] = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    const username = currentUser.username;

    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
    };

    fetchData();
  }, [currentUser.username]);

  const homePage = () => {
    router.push("./userHome");
  };

  const dietaryPage = () => {
    router.push('./editPreference/dietaryPreference')
  }
  return (
    <div>
      <h1 className="text-center p-2 font-semibold text-xl">{`${currentUser.username} Edit Preference`}</h1>
      {!userInfo ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex flex-col p-2 border-gray-400 border-2 rounded m-2">
          <EditPreferenceCard
            title="Dietary Preferences"
            userDetails={userInfo.dietary_preferences}
            redirect = {dietaryPage}
          />

          <EditPreferenceCard
            title="Allergies"
            userDetails={userInfo.allergies}
          />

          <EditPreferenceCard
            title="Health Goals"
            userDetails={userInfo.health_goals}
          />
        </div>
      )}
      <button
        className="p-2 bg-teal-200 border-2 rounded font-semibold m-2"
        onClick={homePage}>
        Back to Home Page
      </button>
    </div>
  );
};

export default UserScreen;
