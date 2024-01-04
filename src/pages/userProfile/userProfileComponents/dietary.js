import React, { useState } from "react";

const Dieraty = (props) => {
  const [selectedDiet, setSelectedDiet] = useState(null);

  const handleDietaryChangeVegetarian = (e) => {
    e.preventDefault();
    props.handleDietaryChangeVegetarian();
    setSelectedDiet("Vegetarian");
  };

  const handleDietaryChangeVegan = (e) => {
    e.preventDefault();
    props.handleDietaryChangeVegan();
    setSelectedDiet("Vegan");
  };

  const handleDietaryChangePescatarian = (e) => {
    e.preventDefault();
    props.handleDietaryChangePescatarian();
    setSelectedDiet("pescatarian");
  };

  const handleDietaryChangeNothing = (e) => {
    e.preventDefault();
    props.handleDietaryChangeNothing();
    setSelectedDiet("nothing");
  };

  const getButtonClass = (diet) => {
    let baseClass =
      "appearance-none block w-full px-3 my-2 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black text-start";
    if (selectedDiet === diet) {
      baseClass += " bg-gray-400"; // Add hover color if this diet is selected
    } else {
      baseClass += " hover:bg-gray-400"; // Otherwise, apply hover effect
    }
    return baseClass;
  };

  return (
    <div>
      <label htmlFor="dietary" className="block text-sm font-medium">
        Select One of the following
      </label>
      <div className="mt-1">
        <button
          onClick={handleDietaryChangeVegetarian}
          required
          className={getButtonClass("Vegetarian")}>
          Vegetarian
        </button>

        <button
          onClick={handleDietaryChangeVegan}
          required
          className={getButtonClass("Vegan")}>
          Vegan
        </button>

        <button
          onClick={handleDietaryChangePescatarian}
          required
          className={getButtonClass("pescatarian")}>
          Pescatarian
        </button>

        <button
          onClick={handleDietaryChangeNothing}
          required
          className={getButtonClass("nothing")}>
          No Restrictions
        </button>
        {props.dietaryPreference === null ? <></> : <h1></h1>}
      </div>
    </div>
  );
};

export default Dieraty;
