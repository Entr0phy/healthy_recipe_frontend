import React, { useState, useEffect } from "react";
import OrderCard from "./userProfileComponents/orderCard";

const OrderHistory = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("userId"))._id;
    const getOrder = async () => {
      const data = await fetch(
        `${process.env.apiKey}/shoppingList/getUserShoppingList/${id}`
      );
      const json = await data.json();
      setOrder(json);
    };

    getOrder();
  }, []);
  return (
    <div className="flex flex-col m-2">
      <h1 className="text-center font-bold text-2xl ">Order History</h1>
      {!order ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2">
          {order?.map((ele) => (
            <div key={ele._id}>
              <OrderCard
                _id={ele._id}
                uploaded_at={ele.uploaded_at}
                status={ele.status}
                shoppingList={ele.shoppingList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
