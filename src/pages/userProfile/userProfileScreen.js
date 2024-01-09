import React, { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";
import Head from "next/head";
import UserHome from "./userHome";
import DietitianHome from "./dietitianHome";

const UserProfileScreen = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const router = useRouter();

  const logout = () => {
    router.push("/");
    setCurrentUser(null);
    sessionStorage.removeItem("userId");
  };

  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      {currentUser && currentUser.userType === "user" && <UserHome />}
      {currentUser && currentUser.userType === 'dietitian' && <DietitianHome />}
      <div className="text-center m-4">
        <button className="m-4 p-2 bg-cyan-200 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfileScreen;
