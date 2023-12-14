import React from "react";

const HealthGoals =(props) => {
    return (
        <div className="mt-1">
        <input
          id="healthGoals1"
          name="healthGoals"
          type="healthGoals"
          value={props.healthGoals1}
          onChange={props.handleHealthGoalChange1}
          className="appearance-none block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          placeholder="Health Goals"
        />
        <input
          id="healthGoals2"
          name="healthGoals"
          type="healthGoals"
          value={props.healthGoals2}
          onChange={props.handleHealthGoalChange2}
          placeholder="Health Goals"
          className="appearance-none block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
        <input
          id="healthGoals3"
          name="healthGoals"
          type="healthGoals"
          value={props.healthGoals3}
          onChange={props.handleHealthGoalChange3}
          placeholder="Health Goals"
          className="appearance-none block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
        <input
          id="healthGoals4"
          name="healthGoals"
          type="healthGoals"
          value={props.healthGoals4}
          onChange={props.handleHealthGoalChange4}
          placeholder="Health Goals"
          className="appearance-none block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
    )
}

export default HealthGoals