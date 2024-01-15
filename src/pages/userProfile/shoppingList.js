import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const ShoppingList = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);
  const router = useRouter();
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

  useEffect(() => {
    if (userInfo) {
      const grocery = userInfo.grocery_list;
      grocery.forEach((ele) => (ele.edit = false));
      setEditQuantity(grocery);
    }
  }, [userInfo]);

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
          groceryId: groceryId,
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

  const handleEditClick = (index) => {
    const updatedList = editQuantity.map((item, idx) => {
      if (idx === index) {
        const prevState = item.edit;
        return { ...item, edit: !prevState };
      }
      return item;
    });
    setEditQuantity(updatedList);
  };

  const handleValueChange = (index, e) => {
    const updatedList = editQuantity.map((item, idx) => {
      if (idx === index) {
        return { ...item, quantity: e.target.value };
      }
      return item;
    });
    setEditQuantity(updatedList);
  };

  const editShoppingList = async () => {
    editQuantity.forEach((ele) => delete ele.edit);
    const editFromList = await fetch(
      `${process.env.apiKey}/auth/user/updateGroceryList`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          grocery_list: editQuantity,
        }),
      }
    );

    if (editFromList.status === 200) {
      alert("Your preferences have been updated!");
      window.location.reload();
    } else {
      window.alert("Please try again");
    }
  };

  const submitOrder = async () => {
    const submitOrder = await fetch(
      `${process.env.apiKey}/shoppingList/addToShoppingList`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submitted_by: userInfo._id,
          shoppingList: editQuantity,
        }),
      }
    );

    if (submitOrder.status === 200) {
      alert("Your preferences have been updated!");
      window.location.reload();
    } else {
      window.alert("Please try again");
    }
  };

  const redirectToOrderHistory = () => {
    router.push('./orderHistory')
  }

  return (
    <div className="flex flex-col">
      <h1 className="m-4 text-2xl font-bold">Shopping List</h1>
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2 p-2 border-grey-200">
          {editQuantity?.length === 0 && (
            <h1 className="text-center font-bold text-xl">
              Shopping List is Empty
            </h1>
          )}
          {editQuantity?.map((ele, index) => (
            <div
              className="flex flex-wrap p-2 border-2 border-grey-200 rounded my-2"
              key={ele._id}>
              <h1 className="font-semibold text-decoration-line: underline text-xl">
                {ele.quantity}
              </h1>
              <h1 className="font-semibold text-xl mr-2">
                &nbsp;{ele.unitOfMeasure}
              </h1>
              <h1 className="font-semibold text-xl mr-1">{ele.name}</h1>
              <button
                onClick={() => deleteFromShoppingList(ele._id)}
                className="mx-2 text-red-600 font-semibold border-2 border-grey-400 p-0.5 rounded">
                Delete
              </button>
              <button
                className="mx-2 text-green-600 font-semibold border-2 border-grey-400 p-0.5 rounded"
                onClick={() => handleEditClick(index)}>
                Edit{" "}
              </button>
              {ele.edit && (
                <input
                  className="bg-gray-200"
                  value={ele.quantity}
                  onChange={(e) => handleValueChange(index, e)}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="text-center content-center m-2 font-semibold">
        {editQuantity?.length > 0 && (
          <button
            onClick={editShoppingList}
            className="p-2 bg-green-200 rounded m-2">
            Save Edits
          </button>
        )}
        {editQuantity?.length > 0 && (
          <button className="p-2 bg-blue-200 rounded m-2" onClick={submitOrder}>
            Submit Order
          </button>
        )}
        <button className="p-2 bg-red-200 rounded m-2" onClick={redirectToOrderHistory}>
          View Order History
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
