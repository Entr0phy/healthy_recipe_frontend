import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";

const PastComment = (props) => {
  const [comment] = useState(
    props?.comment?.filter((ele) => ele.name === props.id)
  );
  return (
    <div className="flex flex-wrap border-2 border-grey-400 rounded">
      <div className="mb-4 h-64 w-64 border-8 p-2 m-2">
        <img className="h-full w-full object-cover " src={props.image} />
      </div>
      <div className="flex flex-col ml-2">
        <div className="flex flex-wrap">
          {props?.tags?.map((ele) => (
            <h4
              className="m-2 font-semibold p-2 border-2 rounded"
              key={Math.random()}>
              {ele}
            </h4>
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-bold m-2">{props.name}</h1>
          {comment?.map((ele) => (
            <div key={ele._id} className="p-2 bg-gray-200 rounded m-0.5">
              <div className="flex flex-wrap">
                {Array(ele.ratings)
                  .fill(true)
                  .map((_, i) => (
                    <MdOutlineStar size={15} key={Math.random()} />
                  ))}
              </div>
              <h1 className="font-semibold">{ele.comments}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastComment;
