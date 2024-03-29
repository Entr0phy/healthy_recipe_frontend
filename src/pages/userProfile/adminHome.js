import React, { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";
import DietitianHome from "./dietitianHome";

const AdminHome = () => {
  const [currentUser] = useContext(Context);
  const router = useRouter();

  const viewOrders = () => {
    router.push("./viewOrders");
  };

  const toggleFeatured = () => {
    router.push("/recipe/searchRecipeScreen?setFeatured=true");
  };

  const dietitianAccount = () => {
    router.push("/logIn/signUpScreen?dietitian=true")
  };

  const adminAccount = () => {
    router.push('/logIn/signUpScreen?admin=true')
  }


  return (
    <>
      <h1 className="font-bold text-center m-2 text-xl">
        Welcome to your Admin HomePage!
      </h1>
      <div className="flex flex-col p-2 justify-center items-center">
        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={viewOrders}>
          <h2>View Orders</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={toggleFeatured}>
          <h2>Edit Featured Recipe</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={dietitianAccount}>
          <h2>Create Dietitian Account </h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={adminAccount}>
          <h2>Create Admin Account </h2>
          <h1>{">"}</h1>
        </div>

      </div>
    </>
  );
};

export default AdminHome;
