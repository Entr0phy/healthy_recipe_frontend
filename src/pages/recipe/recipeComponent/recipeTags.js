import React, { useState, useEffect } from "react";

const RecipeTags = (props) => {
  const [tags, setTags] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.apiKey}/tags/getTags`);
      const json = await data.json();
      setTags(json);
    };
    fetchData();
  }, []);
  const mealTypeTags = tags?.tags?.mealTypeTags;
  const healthTags = tags?.tags?.healthTags;
  const cuisineTags = tags?.tags?.cuisineTags;
  const meatTags = tags?.tags?.meatTags;
  const animalByProductTags = tags?.tags?.animalByProductTags;
  const nonMeatTags = tags?.tags?.nonMeatTags;
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        <label className="font-semibold">Meal Type Tags</label>
        {mealTypeTags?.map((ele) => (
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
        {healthTags?.map((ele) => (
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
        {cuisineTags?.map((ele) => (
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
        {meatTags?.map((ele) => (
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
        {animalByProductTags?.map((ele) => (
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
        {nonMeatTags?.map((ele) => (
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
