import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const ShoppingList = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editQuantity, setEditQuantity] = useState({});
  const router = useRouter();
  const homePage = () => router.push("./userHome");
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
      const groupById = {};
      grocery.forEach((ele) => {
        if (!groupById[ele.recipeId.name]) groupById[ele.recipeId.name] = [ele];
        else groupById[ele.recipeId.name].push(ele);
      });
      setEditQuantity(groupById);
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

  const handleEditClick = (groupName, itemIndex) => {
    // Clone the current state to avoid direct mutation
    const updatedEditQuantity = { ...editQuantity };

    // Check if the group exists
    if (updatedEditQuantity[groupName]) {
      // Toggle the edit state of the specific item within the group
      const items = updatedEditQuantity[groupName].map((item, idx) => {
        if (idx === itemIndex) {
          return { ...item, edit: !item.edit }; // Toggle the edit state
        }
        return item;
      });

      // Update the group with the modified items
      updatedEditQuantity[groupName] = items;

      // Update the state
      setEditQuantity(updatedEditQuantity);
    }
  };

  const handleValueChange = (index, groupName, e) => {
    const updatedEditQuantity = { ...editQuantity };

    if (updatedEditQuantity[groupName]) {
      const updatedList = editQuantity[groupName].map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: e.target.value };
        }
        return item;
      });
      updatedEditQuantity[groupName] = updatedList;
      setEditQuantity(updatedEditQuantity);
    }
  };

  const editShoppingList = async () => {
    // Flatten the editQuantity object into an array
    const itemsToSubmit = Object.values(editQuantity).flat().map(item => {
      // Remove the 'edit' property from each item
      const { edit, ...itemWithoutEdit } = item;
      return itemWithoutEdit;
    });
  
    // Now itemsToSubmit is an array of items without the 'edit' property
    try {
      const response = await fetch(`${process.env.apiKey}/auth/user/updateGroceryList`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          grocery_list: itemsToSubmit,
        }),
      });
  
      if (response.status === 200) {
        alert("Your preferences have been updated!");
        window.location.reload(); // Consider using router.push for a more React-friendly navigation
      } else {
        alert("Please try again");
      }
    } catch (error) {
      console.error("Failed to edit shopping list:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const submitOrder = async () => {
     // Flatten the editQuantity object into an array
  const flattenedItems = Object.values(editQuantity).flat();

  // Merge items by name, summing their quantities
  const mergedItemsByName = flattenedItems.reduce((acc, item) => {
    if (acc[item.name]) {
      // If the item already exists, sum the quantity
      acc[item.name] = {
        ...item,
        quantity: +acc[item.name].quantity + +item.quantity,
      };
    } else {
      // If it's a new item, add it to the accumulator
      acc[item.name] = item;
    }
    return acc;
  }, {});

  // Convert the merged items object back into an array
  const itemsToSubmit = Object.values(mergedItemsByName);
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
          shoppingList: itemsToSubmit,
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
    router.push("./orderHistory");
  };

  return (
    <div className="flex flex-col">
      <h1 className="m-4 text-2xl font-bold">Shopping List</h1>
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2 p-2 border-grey-200 border-2 rounded">
          {Object.keys(editQuantity).length === 0 && (
            <h1 className="text-center font-bold text-xl">
              Shopping List is Empty
            </h1>
          )}
          {Object.keys(editQuantity).map((groupName) => (
            <div key={groupName}>
              <h2 className="font-bold text-lg">{groupName}</h2>
              {editQuantity[groupName]?.map((ele, index) => (
                <div className="flex flex-wrap p-2" key={ele._id}>
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
                    onClick={() => handleEditClick(groupName, index)}>
                    Edit{" "}
                  </button>
                  {ele.edit && (
                    <input
                      className="bg-gray-200"
                      value={ele.quantity}
                      onChange={(e) => handleValueChange(index, groupName, e)}
                    />
                  )}
                </div>
              ))}{" "}
            </div>
          ))}
        </div>
      )}
      <div className="text-center content-center m-2 font-semibold">
        {Object.keys(editQuantity)?.length > 0 && (
          <button
            onClick={editShoppingList}
            className="p-2 bg-green-200 rounded m-2">
            Save Edits
          </button>
        )}
        {Object.keys(editQuantity)?.length > 0 && (
          <button className="p-2 bg-blue-200 rounded m-2" onClick={submitOrder}>
            Submit Order
          </button>
        )}
        <button
          className="p-2 bg-red-200 rounded m-2"
          onClick={redirectToOrderHistory}>
          View Order History
        </button>
      </div>
      <div>
      <button className="p-2 bg-zinc-100 border-2 rounded font-semibold m-2" onClick={homePage}>Back to Settings</button>
      </div>
    </div>
  );
};

export default ShoppingList;
