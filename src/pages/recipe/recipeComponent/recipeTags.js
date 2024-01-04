import React, { useState } from "react";

const RecipeTags = (props) => {
  const mealTypeTags = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
  const healthTags = [
    "Low Calorie",
    "High Protein",
    "Low Sodium",
    "Low Sugar + Low GI",
    "Low Fat",
  ];
  const cuisineTags = [
    "Japanese",
    "Korean",
    "Mediterranean",
    "Western",
    "Chinese",
    "Indian",
    "Greek",
    "Italian",
    "Mexican",
  ];
  const meatTags = ["Poultry", "Fish", "Shellfish", "Beef", "Pork", "Lamb"];
  const animalByProductTags = ["Eggs", "Dairy", "Honey"];
  const nonMeatsTags = [
    "Tubers",
    "Roots",
    "Leafy Greens",
    "Fruits",
    "Gluten",
    "Nuts",
    "Peanuts",
    "Soy",
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        <label className="font-semibold">Meal Type Tags</label>
        {mealTypeTags.map((ele) => (
          <div key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap my-2">
        <label className="font-semibold">Health Tags</label>
        {healthTags.map((ele) => (
          <div className="flex flex-wrap" key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap my-2">
        <label className="font-semibold">Cuisine Tags</label>
        {cuisineTags.map((ele) => (
          <div className="flex flex-wrap" key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap my-2">
        <label className="font-semibold">Meat Tags</label>
        {meatTags.map((ele) => (
          <div className="flex flex-wrap" key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap my-2">
        <label className="font-semibold">Animal By-Product Tags</label>
        {animalByProductTags.map((ele) => (
          <div className="flex flex-wrap" key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap my-2">
        <label className="font-semibold">Non Meat Tags</label>
        {nonMeatsTags.map((ele) => (
          <div className="flex flex-wrap" key={Math.random()}>
            <h1
              className=" p-0.5 bg-gray-400 mx-1 rounded font-semibold"
              onClick={() => props.addToTag(ele)}>
              {ele}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeTags;
