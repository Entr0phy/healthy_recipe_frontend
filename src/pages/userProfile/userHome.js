import React, { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";

const UserHome = () => {
  const [currentUser] = useContext(Context);
  const router = useRouter();

  const customiseProfile = () =>{
    router.push('./editPreference')
  }

  const manageAccount = () => {
    router.push('./manageAccount')
  }

  const shoppingListPage = () => {
    router.push('./shoppingList')
  }

  return (
    <>
        <h1 className="font-bold text-center m-2 text-xl">{`${currentUser.username} Profile Page`}</h1>
      <div className="flex flex-col p-2 justify-center items-center">
        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between" onClick={manageAccount}>
          <h2>Manage Account</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between" onClick={customiseProfile}>
          <h2>Customise Profile</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between">
          <h2>Follow</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between">
          <h2>My Reviews</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between">
          <h2>My Recipes</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between">
          <h2>Saved Recipes</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between">
          <h2>Badges</h2>
          <h2>{">"}</h2>
        </div>

        <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-2 rounded flex justify-between" onClick={shoppingListPage}>
          <h2>Shopping List</h2>
          <h2>{">"}</h2>
        </div>
      </div>
    </>
  );
};

export default UserHome;
