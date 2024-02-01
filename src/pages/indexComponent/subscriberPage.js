import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const SubscriberPage = () => {
  const router = useRouter();

  const [freshContent, setFreshContent] = useState(null);
  const [reconmend, setReconmend] = useState(null);

  useEffect(() => {
    const fetchLatest3Recipe = async () => {
      const data = await fetch(`${process.env.apiKey}/recipe/recipe3Latest`);
      const json = await data.json();
      setFreshContent(json);
    };

    const fetchReconmendedRecipe = async () => {
      const data = await fetch(`${process.env.apiKey}/recipe/reconmendedRecipe`);
      const json = await data.json();
      setReconmend(json);
    };

    fetchLatest3Recipe();
    fetchReconmendedRecipe();
  }, []);

  const redirectToRecipe = () => {
    router.push("./recipe/searchRecipeScreen");
  };

  const redirectToFreshRecipe = (val) => {
    router.push(`./recipe/recipeScreen?recipeId=${val}`);
  };
  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 my-2">
        <h1 className="text-2xl font-bold text-gray-800">Fresh content</h1>
        <h2
          className="text-lg text-blue-600 hover:text-blue-700 cursor-pointer"
          onClick={redirectToRecipe}>
          See all
        </h2>
      </div>

      {!freshContent ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-between px-6">
          {/* Main card for "Recipe 1" */}
          <div
            className="mb-6 lg:mb-0"
            style={{ width: "calc(66.666667% - 1rem)" }}
            onClick={() => redirectToFreshRecipe(freshContent.query[0]._id)}>
            {" "}
            {/* Fixed width with calc() */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={freshContent.query[0].image_url}
                alt="Recipe 1"
                className="object-cover"
                style={{ height: "292px", width: "100%" }}
              />{" "}
              {/* Fixed height for image */}
              <div className="p-4">
                <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide mb-2">
                  New
                </span>
                <h3 className="font-semibold text-lg mb-2">
                  {freshContent.query[0].name}
                </h3>
                <p className="text-gray-700 text-base">
                  {freshContent.query[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Side cards for "Recipe 2" and "Recipe 3" */}
          <div
            className="flex flex-col justify-between"
            style={{ width: "calc(33.333333% - 1rem)" }}>
            {" "}
            {/* Fixed width with calc() */}
            {/* Small card for "Recipe 2" */}
            <div
              className="bg-white rounded-lg shadow overflow-hidden mb-6"
              onClick={() => redirectToFreshRecipe(freshContent.query[1]._id)}>
              <img
                src={freshContent.query[1].image_url}
                alt="Recipe 2"
                className="object-cover"
                style={{ height: "188px", width: "100%" }}
              />{" "}
              {/* Fixed height for image */}
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">
                  {freshContent.query[1].name}
                </h4>
              </div>
            </div>
            {/* Small card for "Recipe 3" */}
            <div
              className="bg-white rounded-lg shadow overflow-hidden"
              onClick={() => redirectToFreshRecipe(freshContent.query[2]._id)}>
              <img
                src={freshContent.query[2].image_url}
                alt="Recipe 3"
                className="object-cover"
                style={{ height: "188px", width: "100%" }}
              />{" "}
              {/* Fixed height for image */}
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">
                  {freshContent.query[2].name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 m-6">
        Recommended For You
      </h2>

      {!reconmend ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {/* Individual card */}
          {reconmend.map((recipe, index) => (
            <div className="w-full sm:w-1/2 md:w-1/3 p-4" key={Math.random()}>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="w-full h-64 flex-shrink-0">
                  <img
                    src={recipe.image_url}
                    alt="recipe Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2"></div>
                  <h3 className="font-semibold text-lg mb-4">{recipe.name}</h3>
                  <button
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-semibold"
                    onClick={() => redirectToFreshRecipe(recipe._id)}>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SubscriberPage