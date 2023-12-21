import React, { useState, useEffect } from "react";

const ShoppingList = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("userId")).username;

    const fetchData = async () => {
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
    };

    fetchData();
  }, []);

  const deleteFromShoppingList = async (groceryId) => {
    const deleteFromList = await fetch(
      `${process.env.apiKey}/auth/user/removeFromGroceryList`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          groceryId: groceryId
        }),
      }
    );

    if (deleteFromList.status === 200) {
        alert("Your preferences have been updated!");
        window.location.reload();
      } else {
        window.alert("Please try again");
      }
  };

  return (
    <div className="flex flex-col">
      <h1 className="m-4 text-2xl font-bold">Shopping List</h1>
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2 p-2 border-grey-200">
          {userInfo.grocery_list.map((ele) => (
            <div className="flex flex-wrap p-2 border-2 border-grey-200 rounded my-2" key={ele._id}>
              <h1 className="font-semibold text-decoration-line: underline text-xl">
                {ele.quantity}
              </h1>
              <h1 className="font-semibold text-xl mr-2">
                {ele.unitOfMeasure}
              </h1>
              <h1 className="font-semibold text-xl mr-1">{ele.name}</h1>
              <button onClick={() => deleteFromShoppingList(ele._id)} className="mx-2 text-red-600 font-semibold border-2 border-grey-400 p-0.5 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
