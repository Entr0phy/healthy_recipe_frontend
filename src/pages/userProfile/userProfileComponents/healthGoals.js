import React, { useState } from "react";

const Dieraty = (props) => {
  const [loseWeight, setLoseWeight] = useState(props.loseWeightState ?? false);
  const [gainMuscle, setGainMuscle] = useState(props.gainMuscleState ?? false);
  const [lowerBloodPressure, setLowerBloodPressure] = useState(props.lowerBloodPressureState ?? false);
  const [reduceBloodSugar, setReduceBloodSugar] = useState(props.reduceBloodSugarState ?? false);
  const [lowerCholesterol, setLowerCholesterol] = useState(props.lowerCholesterolState ?? false);

  const handleLoseWeightChange = (e) => {
    e.preventDefault();
    props.loseWeightChange();
    setLoseWeight((prev)=> !prev)
  };

  const handleGainMuscle = (e) => {
    e.preventDefault();
    props.gainMuscle();
    setGainMuscle((prev)=> !prev)
  };

  const handleLowerBloodPressure = (e) => {
    e.preventDefault();
    props.lowerBloodPressure()
    setLowerBloodPressure((prev)=> !prev)
  };

  const handleReduceBloodSugar = (e) => {
    e.preventDefault();
    props.reduceBloodSugar();
    setReduceBloodSugar((prev)=> !prev)
  };

  const handleLowerCholesterol = (e) => {
    e.preventDefault();
    props.lowerCholesterol();
    setLowerCholesterol((prev)=> !prev)
  };

  const getButtonClass = (option) => {
    let baseClass =
      "appearance-none block w-full px-3 my-2 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black text-start";
    if (option === true) {
      baseClass += " bg-gray-400"; // Add hover color if this diet is selected
    } else {
      baseClass += " hover:bg-gray-400"; // Otherwise, apply hover effect
    }
    return baseClass;
  };

  return (
    <div>
      <label htmlFor="dietary" className="block text-sm font-medium">
        Select Your Health Goals
      </label>
      <div className="mt-1">
        <button
          onClick={handleLoseWeightChange}
          required
          className={getButtonClass(loseWeight)}>
          Lose Weight
        </button>

        <button
          onClick={handleGainMuscle}
          required
          className={getButtonClass(gainMuscle)}>
          Gain Muscle
        </button>

        <button
          onClick={handleLowerBloodPressure}
          required
          className={getButtonClass(lowerBloodPressure)}>
          Lower blood pressure
        </button>

        <button
          onClick={handleReduceBloodSugar}
          required
          className={getButtonClass(reduceBloodSugar)}>
          Reduce Blood Sugar
        </button>

        <button
          onClick={handleLowerCholesterol}
          required
          className={getButtonClass(lowerCholesterol)}>
          Lower cholesterol
        </button>
      </div>
    </div>
  );
};

export default Dieraty;
