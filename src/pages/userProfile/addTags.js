import React, { useState } from "react";

const AddTags = () => {
  const [selectedTags, setSelectedTags] = useState(null);
  const [tagName, setTagName] = useState("");

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleMealTypeTag = () => {
    setSelectedTags("mealTypeTags");
  };

  const handleCuisineTag = () => {
    setSelectedTags("cuisineTags");
  };

  const handleMeatTag = () => {
    setSelectedTags("meatTags");
  };

  const handleAnimalByProductTag = () => {
    setSelectedTags("animalByProductTags");
  };

  const handleNonMeatTags = () => {
    setSelectedTags("nonMeatTags");
  };

  const getButtonClass = (tags) => {
    let baseClass =
      "appearance-none block w-full px-3 my-2 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black text-start";
    if (selectedTags === tags) {
      baseClass += " bg-gray-400"; // Add hover color if this diet is selected
    } else {
      baseClass += " hover:bg-gray-400"; // Otherwise, apply hover effect
    }
    return baseClass;
  };

  const addNewTag = async () => {
    if(selectedTags === null){
        window.alert('Tag cannot be null')
        return;
    }
    const addComment = await fetch(`${process.env.apiKey}/tags/addTags`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tagType: selectedTags,
          tag: tagName
        }),
      });
  
      if (addComment.status === 200) {
        window.alert("Tag Added");
        location.reload();
      } else window.alert("Error, Please try again");
  }
  return (
    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-2xl">Add New Tags</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <label htmlFor="tagType" className="block text-sm font-medium">
            Tag Type
          </label>
          <button
            className={getButtonClass("mealTypeTags")}
            onClick={handleMealTypeTag}>
            Meal Type Tag
          </button>

          <button
            className={getButtonClass("cuisineTags")}
            onClick={handleCuisineTag}>
            Cuisine Tag
          </button>
          <button
            className={getButtonClass("meatTags")}
            onClick={handleMeatTag}>
            Meat Tag
          </button>
          <button
            className={getButtonClass("animalByProductTags")}
            onClick={handleAnimalByProductTag}>
            AnimalByProduct Tag
          </button>
          <button
            className={getButtonClass("nonMeatTags")}
            onClick={handleNonMeatTags}>
            Non Meat Tag
          </button>

          <label htmlFor="tagType" className="block text-sm font-medium my-2">
            Tag Name
          </label>

          <input
            value={tagName}
            onChange={handleTagNameChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />

          <div className="text-center align-center m-2">
            <button className="bg-gray-200 p-2 rounded m-2 font-bold" onClick={addNewTag}>Add Tag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTags;
