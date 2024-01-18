import React, { useState } from "react";
import RecipeTags from "./recipeTags";

const RecipeForm = (props) => {
  const [name, setName] = useState(props?.name ?? "");
  const [description, setDescription] = useState(props?.description ?? "");
  const [ingredients, setIngredients] = useState(props?.ingredients ?? []);
  const [addIngredientName, setAddIngredientName] = useState("");
  const [addIngredientUOM, setAddIngredientUOM] = useState("");
  const [addIngredientQuantity, setAddIngredientQuantity] = useState(0);
  const [steps, setSteps] = useState(props?.steps ?? []);
  const [addSteps, setAddSteps] = useState("");
  const [prepTime, setPrepTime] = useState(props?.prepTime ?? 0);
  const [cookingTime, setCookingTime] = useState(props?.cookingTime ?? 0);
  const [nutritionalData, setNutritionalData] = useState(
    props?.nutritionalData ?? {
      calories: 0,
      carbohydrates: 0,
      sodium: 0,
      protein: 0,
      fat: 0,
    }
  );
  const [tags, setTags] = useState(props?.tags ?? []);
  const [image, setImage] = useState(props?.image ?? "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddIngredientNameChange = (e) => {
    setAddIngredientName(e.target.value);
  };

  const handleAddIngredientUOMChange = (e) => {
    setAddIngredientUOM(e.target.value);
  };

  const handleAddIngredientQuantityChange = (e) => {
    setAddIngredientQuantity(e.target.value);
  };

  const handleAddStepsChange = (e) => {
    setAddSteps(e.target.value);
  };

  const handlePrepTimeChange = (e) => {
    setPrepTime(e.target.value);
  };

  const handleCookingTimeChange = (e) => {
    setCookingTime(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setNutritionalData((previousValue) => ({
      ...previousValue,
      calories: e.target.value,
    }));
  };

  const handleCarbohydratesChange = (e) => {
    setNutritionalData((previousValue) => ({
      ...previousValue,
      carbohydrates: e.target.value,
    }));
  };

  const handleSodiumChange = (e) => {
    setNutritionalData((previousValue) => ({
      ...previousValue,
      sodium: e.target.value,
    }));
  };

  const handleProteinChange = (e) => {
    setNutritionalData((previousValue) => ({
      ...previousValue,
      protein: e.target.value,
    }));
  };

  const handleFatChange = (e) => {
    setNutritionalData((previousValue) => ({
      ...previousValue,
      fat: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  const addToIngredientList = (e) => {
    e.preventDefault();
    setIngredients((previousIngredient) => [
      ...previousIngredient,
      {
        ingredientName: addIngredientName,
        quantity: addIngredientQuantity,
        unitOfMeasure: addIngredientUOM,
      },
    ]);
    setAddIngredientName("");
    setAddIngredientUOM("");
    setAddIngredientQuantity(0);
  };

  const addToRecipeSteps = (e) => {
    e.preventDefault();
    setSteps((previousSteps) => [...previousSteps, addSteps]);
    setAddSteps("");
  };

  const addToTags = (tag) => {
    tags?.indexOf(tag) === -1 ? setTags((prev) => [...prev, tag]) : tags;
  };

  const removeIngredient = (e, ingredient) => {
    e.preventDefault();
    const removedIngredient = ingredients.filter((item) => item !== ingredient);
    setIngredients(removedIngredient);
  };

  const removeRecipeSteps = (e, step) => {
    e.preventDefault();
    const removedSteps = steps.filter((item) => item !== step);
    setSteps(removedSteps);
  };

  const removeTags = (e, tag) => {
    e.preventDefault();
    const removedTags = tags.filter((item) => item !== tag);
    setTags(removedTags);
  };

  const handleSubmit = async () => {
    const handleSubmit = await fetch(`${process.env.apiKey}/recipe/addRecipe`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submitted_by: props.user,
        name: props.update? `${props.username}'s ${name}` : name,
        description: description,
        ingredients: ingredients,
        steps: steps,
        meal_type: "main",
        cooking_time: cookingTime,
        prep_time: prepTime,
        nutritional_data: nutritionalData,
        tags: tags,
        image_url: image,
        verificationStatus: props?.update === true ? false : true,
      }),
    });

    if (handleSubmit.status === 200) {
        window.alert("Recipe Created")
    } else window.alert("Error, Please Try Again");
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-6xl">
      <div className="bg-zinc-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Recipe Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Recipe Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={description}
                onChange={handleDescriptionChange}
                rows={10}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="recipeIngredients"
              className="block text-sm font-medium">
              Recipe Ingredients
            </label>
            <div className="mt-1">
              <div className="my-2">
                <label className="block text-sm font-small">
                  Current Ingredients
                </label>
                {ingredients.map((ele) => (
                  <div
                    key={Math.random()}
                    className="flex place-content-between">
                    <h1 className="font-bold">
                      {ele.quantity}&nbsp; {ele.unitOfMeasure} &nbsp;{" "}
                      {ele.ingredientName}
                    </h1>
                    <button
                      className="text-red-600"
                      onClick={(e) => {
                        removeIngredient(e, ele);
                      }}>
                      Remove
                    </button>
                  </div>
                ))}
                {ingredients.length === 0 && (
                  <h1 className="font-bold text-red-600">
                    No Ingredients Added
                  </h1>
                )}
              </div>

              <label className="block text-sm font-medium">
                Ingredient Name
              </label>
              <input
                id="addIngredients"
                name="addIngredients"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={addIngredientName}
                onChange={handleAddIngredientNameChange}
              />

              <label className="block text-sm font-medium">
                Ingredient Unit Of Measure
              </label>
              <input
                id="addIngredients"
                name="addIngredients"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={addIngredientUOM}
                onChange={handleAddIngredientUOMChange}
              />

              <label className="block text-sm font-medium">
                Ingredient Quantity
              </label>
              <input
                id="addIngredients"
                name="addIngredients"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={addIngredientQuantity}
                onChange={handleAddIngredientQuantityChange}
                type="number"
              />
              <button
                onClick={addToIngredientList}
                className="bg-gray-200 px-2 rounded my-2">
                Add Ingredient
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="Recipe Steps" className="block text-sm font-medium">
              Recipe Steps
            </label>
            <div className="mt-1">
              <div className="my-2">
                <label className="block text-sm font-small">
                  Current Steps
                </label>
                {steps.map((ele) => (
                  <div key={Math.random()} className="break-words">
                    <p className="font-bold">{ele}</p>
                    <button
                      className="text-red-600"
                      onClick={(e) => {
                        removeRecipeSteps(e, ele);
                      }}>
                      Remove
                    </button>
                  </div>
                ))}
                {steps.length === 0 && (
                  <h1 className="font-bold text-red-600">No Steps Added</h1>
                )}
              </div>

              <label className="block text-sm font-medium">Recipe Step</label>
              <textarea
                id="recipeStep"
                name="recipeStep"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={addSteps}
                onChange={handleAddStepsChange}
                rows={5}
              />
              <button
                onClick={addToRecipeSteps}
                className="bg-gray-200 px-2 rounded my-2">
                Add To Step
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Prep Time
            </label>
            <div className="mt-1">
              <input
                id="prepTime"
                name="prepTime"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={prepTime}
                onChange={handlePrepTimeChange}
                type="number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Cooking Time
            </label>
            <div className="mt-1">
              <input
                id="cookingTime"
                name="cookingTime"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={cookingTime}
                onChange={handleCookingTimeChange}
                type="number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Nutritional Information
            </label>
            <div className="mt-1">
              <label className="block text-sm font-medium">Calories</label>
              <input
                id="calories"
                name="calories"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={nutritionalData.calories}
                onChange={handleCaloriesChange}
                type="number"
              />

              <label className="block text-sm font-medium">Carbohydrates</label>
              <input
                id="carbohydrates"
                name="carbohydrates"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={nutritionalData.carbohydrates}
                onChange={handleCarbohydratesChange}
                type="number"
              />
            </div>

            <label className="block text-sm font-medium">Sodium</label>
            <input
              id="sodium"
              name="sodium"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={nutritionalData.sodium}
              onChange={handleSodiumChange}
              type="number"
            />

            <label className="block text-sm font-medium">Protein</label>
            <input
              id="protein"
              name="protein"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={nutritionalData.protein}
              onChange={handleProteinChange}
              type="number"
            />

            <label className="block text-sm font-medium">Fat</label>
            <input
              id="fat"
              name="fat"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={nutritionalData.fat}
              onChange={handleFatChange}
              type="number"
            />
          </div>

          <div>
            <label htmlFor="Add Tags" className="block text-sm font-medium">
              Add Tags
            </label>
            <div className="mt-1">
              <div className="my-2">
                <label className="block text-sm font-small">Current Tags</label>
                {tags.map((ele) => (
                  <div
                    key={Math.random()}
                    className="flex place-content-between">
                    <p className="font-bold">{ele}</p>
                    <button
                      className="text-red-600"
                      onClick={(e) => {
                        removeTags(e, ele);
                      }}>
                      Remove
                    </button>
                  </div>
                ))}
                {tags.length === 0 && (
                  <h1 className="font-bold text-red-600">No Tags Added</h1>
                )}
              </div>

              <RecipeTags addToTag={addToTags} />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium">
              Image URL
            </label>
            <div className="mt-1">
              <input
                id="image"
                name="image"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                value={image}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button
            className="font-bold p-2 bg-gray-600 rounded text-white"
            onClick={handleSubmit}>
            {props?.update === true ? "Create Your Version" : "Create Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
