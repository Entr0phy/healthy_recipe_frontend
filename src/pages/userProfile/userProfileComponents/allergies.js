import React, { useState } from "react";

const Allergies = (prop) => {
  const [search, setSearch] = useState("");
  const [searchAllergy, setSearchAllergy] = useState(false);
  const [initial, setInitial] = useState(true);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchAllergyCall = async (e) => {
    e.preventDefault();
    setInitial(false);

    const allergy = await fetch(
      `${process.env.apiKey}/allergies/searchAllergies`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: search }),
      }
    );

    if (allergy.status === 200) {
      let data = await allergy.json();
      if (data.allergy.length > 0) setSearchAllergy(data.allergy);
      else setSearchAllergy(false);
    } else {
      window.alert("Error, please try again");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label className="text-grey-400 text-sm">Search For Allergy</label>

        <input
          className=" my-1 p-1 border-2 border-grey-400 rounded"
          onChange={handleSearch}
          value={search}
        />

        <button
          className="my-1 bg-teal-400 rounded p-1 font-semibold"
          onClick={searchAllergyCall}>
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {!initial && !searchAllergy && (<h1>No Allergies Found</h1>)}
        {!initial && searchAllergy && (
          <>
            <label className="text-sm m-2">Search Allergies</label>
            {searchAllergy.map((ele) => (
              <h1 key={Math.random()} className="m-2 p-1 border-grey-400 border-2 rounded font-semibold text-sm" onClick={() => prop.setParentAllergy(ele.name)}>
                {ele.name}
              </h1>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-wrap">
        {prop.parentAllergy.length > 0 &&
          <>
           <label className="text-sm m-2">Selected Allergy</label>
           {prop.parentAllergy.map((ele)=> (
            <h1 className="m-2 p-1 border-2 border-grey-600 rounded text-sm font-semibold" onClick={() => prop.removeParentAllergy(ele)}>{ele}</h1>
           ))}
          </>
        }
      </div>
    </div>
  );
};

export default Allergies;
