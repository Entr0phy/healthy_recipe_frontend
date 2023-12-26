import React, { useState, useEffect } from "react";
import PastComment from "./reviewComponent/pastComment";
import Link from "next/link";
const MyReviews = () => {
  const [reviewRecipe, setReviewRecipe] = useState(null);
  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("userId"))._id;
    const fetchFeaturedRecipe = async () => {
      const data = await fetch(
        `${process.env.apiKey}/recipe/getReviewedRecipe`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: id,
          }),
        }
      );
      const json = await data.json();
      setReviewRecipe(json);
    };

    fetchFeaturedRecipe();
  }, []);

  return (
    <div className="flex flex-col m-7 my-10">
      <h1 className="text-xl font-bold">MY REVIEWS</h1>
      {!reviewRecipe ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mx-2 my-10">
          <h1 className="text-xl font-bold ">PAST COMMENTS</h1>
          {reviewRecipe.query.map((ele) => (
            <Link
              key={ele._id}
              href={`../recipe/recipeScreen?recipeId=${ele._id}`}>
              <PastComment
                image={ele.image_url}
                name={ele.name}
                description={ele.description}
                key={ele._id}
                comment={ele.comments}
                id={JSON.parse(sessionStorage.getItem("userId"))._id}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
