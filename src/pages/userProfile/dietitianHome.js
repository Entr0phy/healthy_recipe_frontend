import React, { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";

const DietitianHome = () => {
  const [currentUser] = useContext(Context);
  const router = useRouter();

  const verifyRecipe = () => {
    router.push("./verifyRecipe");
  };

  const editQualifications = () => {
    router.push("./qualifications");
  };

  const dietitianRecipe = () => {
    router.push("./dietitianRecipe");
  };

  const createNew = () => router.push("/recipe/createRecipe");

  const toggleFeatured = () => {
    router.push("/recipe/searchRecipeScreen?setFeatured=true");
  };

  const addTags = () => {
    router.push('./addTags')
  }

  return (
    <>
      <h1 className="font-bold text-center m-2 text-xl">
        Welcome to your dietitian dashboard!
      </h1>
      <div className="flex flex-col p-2 justify-center items-center">
        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={verifyRecipe}>
          <h2>Verify Recipe</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={editQualifications}>
          <h2>Edit Qualifications</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={dietitianRecipe}>
          <h2>View My Recipes</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={createNew}>
          <h2>Create New Recipe</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={toggleFeatured}>
          <h2>Toggle Featured Recipe</h2>
          <h1>{">"}</h1>
        </div>

        <div
          className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between"
          onClick={addTags}>
          <h2>Add Tags</h2>
          <h1>{">"}</h1>
        </div>
      </div>
    </>
  );
};

export default DietitianHome;
