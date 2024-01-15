import React, { useState, useEffect } from "react";
import OrderCard from "./userProfileComponents/orderCard";
import UpdateStatus from "./adminComponent/updateStatus";

const OrderHistory = () => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(null);

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("userId"))._id;
    const getOrder = async () => {
      const data = await fetch(
        `${process.env.apiKey}/shoppingList/getNotCompletedList`
      );
      const json = await data.json();
      setOrder(json);
    };

    getOrder();
  }, []);

  useEffect(() => {
    setStatus(new Array(order?.length).fill(false));
  }, [order]);

  useEffect(() => {
    setUpdatedStatus(order?.map((ele) => ele.status));
  }, [order]);

  const updateStatus = (index) => {
    const updatedStatus = status.map((item, idx) =>
      idx === index ? !item : item
    );
    setStatus(updatedStatus);
  };

  const handleWaiting = (index) => {
    const newStatus = updatedStatus.map((item, idx) =>
      idx === index ? "Waiting for order to be picked up" : item
    );
    setUpdatedStatus(newStatus);
  };

  const handleProcessing = (index) => {
    const newStatus = updatedStatus.map((item, idx) =>
      idx === index ? "Processing" : item
    );
    setUpdatedStatus(newStatus);
  };

  const handleDelivery = (index) => {
    const newStatus = updatedStatus.map((item, idx) =>
      idx === index ? "Out For Delivery" : item
    );
    setUpdatedStatus(newStatus);
  };

  const handleCompleted = (index) => {
    const newStatus = updatedStatus.map((item, idx) =>
      idx === index ? "Completed" : item
    );
    setUpdatedStatus(newStatus);
  };

  const confirmStatusUpdate = async(id, status) => {
    const update = await fetch(
        `${process.env.apiKey}/shoppingList/updateOrderStatus`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            status: status,
          }),
        }
      );
  
      if (update.status === 200) {
        alert("Your preferences have been updated!");
        location.reload();
      } else {
        window.alert("Please try again");
      }
  }

  return (
    <div className="flex flex-col m-2">
      <h1 className="text-center font-bold text-2xl ">
        View Non-Completed Orders
      </h1>
      {!order ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2">
          {order?.map((ele, index) => (
            <div
              key={ele._id}
              className="p-2 border-2 border-gray-200 rounded m-2">
              <h1 className="mx-2 font-bold text-center">
                {" "}
                User: {ele.submitted_by.username}
              </h1>
              <OrderCard
                _id={ele._id}
                uploaded_at={ele.uploaded_at}
                status={ele.status}
                shoppingList={ele.shoppingList}
              />
              <div className="content-center text-center">
                <button
                  className="bg-green-200 p-2 rounded font-semibold"
                  onClick={() => updateStatus(index)}>
                  Update Status
                </button>
              </div>

              {status[index] && (
                <>
                  <UpdateStatus
                    status={ele.status}
                    waiting={() => handleWaiting(index)}
                    processing={() => handleProcessing(index)}
                    delivery={() => handleDelivery(index)}
                    completed={() => handleCompleted(index)}
                  />
                  <div className="text-center content-center p-2 bg-blue-300 rounded">
                    <button onClick={() => confirmStatusUpdate(ele._id, updatedStatus[index])}>Confirm</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
