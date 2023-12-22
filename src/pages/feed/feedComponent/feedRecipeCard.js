import React from "react";

const FeedRecipeCard = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="w-25 h-25 bg-gray-200 overflow-hidden">
        <img
          src={props.image}
          alt="Recipe"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Content */}
      <div>
        {/* Title and Label */}
        <h3 className="text-gray-900 font-bold text-xl mb-2">{props.name}</h3>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-4">
          {props.tag}
        </span>

        {/* Caption */}
        <p className="text-gray-700 text-base mb-4">{props.description}</p>

        {/* Comment and Rating Section */}
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <span className="text-gray-900 font-semibold">{props.rating}</span>
            <svg
              className="fill-current text-yellow-500 w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M12 .587l3.297 6.673 7.371 1.07-5.334 5.203 1.259 7.337L12 17.255l-6.593 3.615 1.259-7.337-5.334-5.203 7.371-1.07L12 .587z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedRecipeCard;
