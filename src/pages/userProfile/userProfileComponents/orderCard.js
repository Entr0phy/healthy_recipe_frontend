import React from "react";

const OrderCard = (props) => {
  return (
    <div
      className="border-2 border-gray-200 m-2 p-2 rounded flex flex-col">
      <h1 className="font-bold">Order Number: {props._id}</h1>
      <h1 className="font-bold">
        Date Ordered: {props?.uploaded_at?.split("T")[0]}
      </h1>
      <h1 className="font-bold">Status: {props.status}</h1>
      <h1 className="font-bold">Items Ordered</h1>
      {props?.shoppingList?.map((items) => (
        <div key={items._id}>
          <h1>
            {items.quantity} &nbsp; {items.unitOfMeasure} &nbsp; {items.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
