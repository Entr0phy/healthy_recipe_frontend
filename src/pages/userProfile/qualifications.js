import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useRouter } from "next/router";

const Qualifications = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser] = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId"))._id;

    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserById/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
    };
    fetchData();
  }, []);

  const editQualification = () => {
    router.push('./dietitianComponent/qualificationForm')
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-center p-2 font-semibold text-xl">{`${currentUser?.username} Qualifications`}</h1>
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div className="p-2 border-2 border-gray-400 rounded m-2">
          {!currentUser.qualifications ? (
            <h1 className="text-center font-bold text-xl">
              No Qualifications Listed
            </h1>
          ) : (
            currentUser?.qualifications.map((ele) => (
              <div key={ele._id} className="flex justify-between">
                <h1 className="m-2 font-semibold">{ele.qualifications}</h1>
                <h1 className="m-2 font-bold">{ele.dateObtained}</h1>
              </div>
            ))
          )}
        </div>
      )}

      <div className="text-center m-2">
        <button
          className="p-2 bg-gray-200 rounded font-semibold"
          onClick={editQualification}>
          Edit Qualification
        </button>
      </div>
    </div>
  );
};

export default Qualifications;
