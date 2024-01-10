import React, { useState } from "react";
import { useRouter } from "next/router";

const QualificationForm = () => {
  const [qualificationName, setQualificationName] = useState("");
  const [qualificationDate, setQualificationDate] = useState("");
  const router = useRouter();
  const handleQualificationNameChange = (e) => {
    setQualificationName(e.target.value);
  };

  const handleQualificationDateChange = (e) => {
    setQualificationDate(e.target.value);
  };
  const addNewQualification = async () => {
    const update = await fetch(
      `${process.env.apiKey}/auth/user/addQualification`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("userId"))._id,
          qualifications: qualificationName,
          dateObtained: qualificationDate,
        }),
      }
    );

    if (update.status === 200) {
      window.alert("Your preferences have been updated!");
      router.push('/userProfile/qualifications')
    } else {
      window.alert("Please try again");
    }
  };
  return (
    <div className="m-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-xl font-semibold text-black my-3">
        Add New Qualification
      </h1>
      <label>Qualification Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={qualificationName}
        onChange={handleQualificationNameChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
      />

      <label>Qualification Date Obtained</label>
      <input
        id="date"
        name="date"
        type="text"
        value={qualificationDate}
        onChange={handleQualificationDateChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
      />

      <button
        className="m-2 rounded p-2 bg-gray-200"
        onClick={addNewQualification}>
        Add Qualification
      </button>
    </div>
  );
};

export default QualificationForm;
