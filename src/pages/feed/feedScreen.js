import React, { useState } from "react";
import FeaturedRecipes from "./feedComponent/featuredRecipe";
import MainFeed from "./feedComponent/mainFeed";
import MyFeed from "./feedComponent/myFeed";

const Feed = () => {
  // State to track the active button
  const [activeTab, setActiveTab] = useState("mainFeed");

  // Function to handle button click
  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="m-6 flex flex-col">
      <div className="flex justify-center space-x-2 bg-gray-200 rounded-full p-1">
        {/* Buttons with conditional styling */}
        <button
          onClick={() => handleButtonClick("mainFeed")}
          className={`${
            activeTab === "mainFeed"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          } font-semibold py-2 px-6 rounded-full focus:outline-none`}>
          MAIN FEED
        </button>
        <button
          onClick={() => handleButtonClick("featuredRecipes")}
          className={`${
            activeTab === "featuredRecipes"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          } font-semibold py-2 px-6 rounded-full focus:outline-none`}>
          FEATURED RECIPES
        </button>
        <button
          onClick={() => handleButtonClick("myFeed")}
          className={`${
            activeTab === "myFeed"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          } font-semibold py-2 px-6 rounded-full focus:outline-none`}>
          MY FEED
        </button>
      </div>
      {activeTab === 'featuredRecipes' && <FeaturedRecipes/>}
      {activeTab === 'mainFeed' && <MainFeed/>}
      {activeTab === 'myFeed' && <MyFeed />}
    </div>
  );
};

export default Feed;
