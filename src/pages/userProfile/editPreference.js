import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
const UserScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser] = useContext(Context);
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
  }, []);
  return (
    <div>
      <h1 className="text-center p-2 font-semibold text-xl">{`${currentUser.username} Edit Preference`}</h1>
      {!userInfo ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex flex-col p-2 border-gray-400 border-2 rounded m-2">
          <div className="flex flex-col border-2 rounded border-grey-300 p-2 m-2">
            <h2 className="font-bold text-xl">Dietary Preferences</h2>

            {userInfo.dietary_preferences.map((ele) => (
              <h4 className="font-semibold ml-2">{ele}</h4>
            ))}
          </div>

          <div className=" flex flex-col border-2 rounded border-grey-300 p-2 m-2">
            <h2 className="font-bold text-xl">Allergies</h2>
            <div>
              {userInfo.allergies.map((ele) => (
                <h4 className="font-semibold">{ele}</h4>
              ))}
            </div>
          </div>

          <div className=" flex flex-col border-2 rounded border-grey-300 p-2 m-2">
            <h2 className="font-bold text-xl">Health Goals</h2>
            <div>
              {userInfo.health_goals.map((ele) => (
                <h4 className="font-semibold">{ele}</h4>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserScreen;
