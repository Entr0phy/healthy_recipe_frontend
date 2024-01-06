import React from "react";

const RecipeSort = (props) => {
  const sort = ["cooking_time", "calories", "ratings"];

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        <label className="font-semibold">Sort Recipe By</label>
        {sort.map((ele) => (
          <div key={Math.random()}>
            <h1 className="p-0.5 bg-gray-400 mx-1 rounded font-semibold" onClick={()=> props.filter(ele)}>
                {ele}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSort;
