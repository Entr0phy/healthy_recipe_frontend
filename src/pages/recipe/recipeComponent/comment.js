import React, { useState } from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import Link from "next/link";

const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const handleCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleToggle1 = () => {
    setRating(1);
    setToggle1(true);
    setToggle2(false);
    setToggle3(false);
    setToggle4(false);
    setToggle5(false);
  };

  const handleToggle2 = () => {
    setRating(2);
    setToggle1(true);
    setToggle2(true);
    setToggle3(false);
    setToggle4(false);
    setToggle5(false);
  };

  const handleToggle3 = () => {
    setRating(3);
    setToggle1(true);
    setToggle2(true);
    setToggle3(true);
    setToggle4(false);
    setToggle5(false);
  };

  const handleToggle4 = () => {
    setRating(4);
    setToggle1(true);
    setToggle2(true);
    setToggle3(true);
    setToggle4(true);
    setToggle5(false);
  };

  const handleToggle5 = () => {
    setRating(5);
    setToggle1(true);
    setToggle2(true);
    setToggle3(true);
    setToggle4(true);
    setToggle5(true);
  };

  const addComment = async () => {
    const addComment = await fetch(`${process.env.apiKey}/recipe/addComment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.recipeId._id,
        name: props.user._id,
        ratings: rating,
        comments: comment,
        userInfo: props.user,
        recipeInfo: props.recipeId
      }),
    });

    if (addComment.status === 200) {
      window.alert("Review Added");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  const deleteComment = async (commentId, commentRating) => {
    const deleteComment = await fetch(
      `${process.env.apiKey}/recipe/deleteComment`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.recipeId,
          commentId: commentId,
          ratings: commentRating,
        }),
      }
    );

    if (deleteComment.status === 200) {
      window.alert("Review Deleted");
      location.reload();
    } else window.alert("Error");
  };

  return (
    <div className="flex flex-col my-2">
      <div className="p-2 border-2 border-grey-400 rounded">
        {props.user && (
          <>
            <div className="w-full h-32">
              <textarea
                placeholder="Add your Comments"
                className="w-full h-full p-2 border-2"
                value={comment}
                onChange={handleCommentChange}></textarea>
            </div>

            <div className="h-8 my-2 flex flex-wrap">
              {!toggle1 && (
                <MdOutlineStarOutline
                  size={35}
                  color="#000000"
                  className="mx-1"
                  onClick={handleToggle1}
                />
              )}
              {toggle1 && (
                <MdOutlineStar
                  size={35}
                  className="mx-1"
                  onClick={handleToggle1}
                />
              )}
              {!toggle2 && (
                <MdOutlineStarOutline
                  size={35}
                  color="#000000"
                  className="mx-1"
                  onClick={handleToggle2}
                />
              )}
              {toggle2 && (
                <MdOutlineStar
                  size={35}
                  className="mx-1"
                  onClick={handleToggle2}
                />
              )}
              {!toggle3 && (
                <MdOutlineStarOutline
                  size={35}
                  color="#000000"
                  className="mx-1"
                  onClick={handleToggle3}
                />
              )}
              {toggle3 && (
                <MdOutlineStar
                  size={35}
                  className="mx-1"
                  onClick={handleToggle3}
                />
              )}
              {!toggle4 && (
                <MdOutlineStarOutline
                  size={35}
                  color="#000000"
                  className="mx-1"
                  onClick={handleToggle4}
                />
              )}
              {toggle4 && (
                <MdOutlineStar
                  size={35}
                  className="mx-1"
                  onClick={handleToggle4}
                />
              )}
              {!toggle5 && (
                <MdOutlineStarOutline
                  size={35}
                  color="#000000"
                  className="mx-1"
                  onClick={handleToggle5}
                />
              )}
              {toggle5 && (
                <MdOutlineStar
                  size={35}
                  className="mx-1"
                  onClick={handleToggle5}
                />
              )}
            </div>

            <button
              className="p-2 border-2 border-grey-400 rounded bg-gray-600 text-white"
              onClick={addComment}>
              Post Comment
            </button>
          </>
        )}
        <h1 className="font-bold my-2 text-xl">Top Comment</h1>
        <div className="flex flex-col">
          {props?.comments?.map((ele) => (
            <div
              key={ele._id}
              className="border-2 p-2 border-grey-200 rounded m-2">
              <Link
                className="font-semibold"
                href={`/userProfile/profilePage?profileId=${ele.name._id}`}>
                {ele.name.username}
              </Link>
              <div className="flex flex-wrap my-2">
                {Array(ele.ratings)
                  .fill(true)
                  .map((_, i) => (
                    <MdOutlineStar size={15} key={Math.random()} />
                  ))}
              </div>
              <h1 className="font-semibold">{ele.comments}</h1>
              {(props?.user._id === ele.name._id || props?.user.userType === 'admin') && (
                <button
                  className="p-2 bg-red-200 rounded"
                  onClick={() => deleteComment(ele._id, ele.ratings)}>
                  Delete Comment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
