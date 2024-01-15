import React, { useState } from "react";

const UpdateStatus = (props) => {
  const [waiting, setWaiting] = useState(props.status === "Waiting for order to be picked up" ? true : false);
  const [processing, setProcessing] = useState(props.status === "Processing" ? true : false);
  const [delivery, setDelivery] = useState(props.status === 'Out For Delivery' ? true : false);
  const [completed, setCompleted] = useState(false);
  
  const handleWaiting = () => {
    props.waiting();
    setWaiting(true);
    setProcessing(false);
    setDelivery(false);
    setCompleted(false);
  };

  const handleProcessing = () => {
    props.processing();
    setWaiting(false);
    setProcessing(true);
    setDelivery(false);
    setCompleted(false);
  };

  const handleDelivery = () => {
    props.delivery();
    setWaiting(false);
    setProcessing(false);
    setDelivery(true);
    setCompleted(false);
  };

  const handleCompleted = () => {
    props.completed();
    setWaiting(false);
    setProcessing(false);
    setDelivery(false);
    setCompleted(true);
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
      <div className="mt-1">
        <button
          onClick={handleWaiting}
          required
          className={getButtonClass(waiting)}>
          Waiting For Order To Be Picked Up
        </button>

        <button
          onClick={handleProcessing}
          required
          className={getButtonClass(processing)}>
          Processing Order
        </button>

        <button
          onClick={handleDelivery}
          required
          className={getButtonClass(delivery)}>
          Order Is Out For Delivery
        </button>

        <button
          onClick={handleCompleted}
          required
          className={getButtonClass(completed)}>
          Order Completed
        </button>
      </div>
    </div>
  );
};

export default UpdateStatus;
