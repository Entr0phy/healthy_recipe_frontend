import React, { useState } from "react";
import Link from "next/link";

const Question = (props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  const addQuestion = async () => {
    const addQuestion = await fetch(
      `${process.env.apiKey}/recipe/postQuestion`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.recipeId,
          questionName: props.user._id,
          question: question,
        }),
      }
    );

    if (addQuestion.status === 200) {
      window.alert("Question Added");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  const addAnswer = async (questionId) => {
    const addAnswer = await fetch(`${process.env.apiKey}/recipe/postAnswer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.recipeId,
        answerName: props.user._id,
        answer: answer,
        recipeId: questionId,
      }),
    });

    if (addAnswer.status === 200) {
      window.alert("Answer Added");
      location.reload();
    } else window.alert("Error, Please try again");
  };

  return (
    <div className="flex flex-col my-2">
      <div className="p-2 border-2 border-gray-400 rounded">
        {props?.user?.userType === "user" && (
          <>
            <div className="w-full h-32">
              <textarea
                placeholder="Ask your question"
                className="w-full h-full p-2 border-2"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>

            <button
              className="p-2 border-2 border-grey-400 rounded bg-gray-600 text-white my-2"
              onClick={addQuestion}
              disabled={question === ''}>
              Post Question
            </button>
          </>
        )}
        <div className="flex flex-col">
          {props?.questions?.map((ele) => (
            <div
              key={ele._id}
              className="border-2 p-2 border-grey-200 rounded m-2">
              <div className="my-2 border-red-600 border-2 p-2">
                <label className="semibold text-red-600">Question</label>
                <Link
                  className=" mx-2 font-semibold"
                  href={`/userProfile/profilePage?profileId=${ele.questionName._id}`}>
                  {ele.questionName.username}
                </Link>
                <h1 className="">{ele.question}</h1>
              </div>

              <div className="my-2 border-blue-600 border-2 p-2">
                <label className="semibold text-blue-600">Answer</label>
                {ele.answerName ? (
                  <>
                    <Link
                      className=" mx-2 font-semibold"
                      href={`/userProfile/profilePage?profileId=${ele.answerName._id}`}>
                      {ele.answerName.username}
                    </Link>
                    <h1 className="">{ele.answer}</h1>
                  </>
                ) : props.user.userType !== "dietitian" ? (
                  <h1>This Question Has yet to be answered yet</h1>
                ) : (
                  <>
                    <textarea
                      placeholder="Answer the Question"
                      className="w-full h-full p-2 border-2"
                      value={answer}
                      onChange={handleAnswerChange}
                    />

                    <button
                      className="p-2 border-2 border-grey-400 rounded bg-gray-600 text-white my-2"
                      onClick={() => addAnswer(ele._id)}
                      disabled={answer===''}>
                      Post Answer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
