import { useState } from "react";
import RecipeSearch from "./recipeComponent/recipeSearch";
import Link from "next/link";
export default function RecipeScreen() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [initial, setInitial] = useState(true);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const recipeSearch = async () => {
    setInitial(false);

    const recipe = await fetch(`${process.env.apiKey}/recipe/searchRecipe`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search }),
    });

    if (recipe.status === 200) {
      let data = await recipe.json();
      if (data.recipe.length > 0) setSearchResult(data.recipe);
      else setSearchResult(false);
    } else {
      window.alert("Error, please try again");
    }
  };
  return (
    <div className=" bg-green-800 flex flex-col justify-center py-6 sm:px-6 pg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-50">
          Search for Recipe
        </h2>
      </div>
      <div className="mt-8">
        <div className="mt-1 flex flex-row">
          <input
            id="recipeSearch"
            name="recipeSearch"
            type="recipeSearch"
            value={search}
            onChange={handleSearchChange}
            className="appearance-none block w-full px-5 py-2 border"
          />
          <div className="flex pl-4">
            <button
              onClick={recipeSearch}
              className="bg-white p-2 rounded-full font-bold text-slate-700">
              Search
            </button>
          </div>
        </div>

        <div className="p-4">
          {!initial && !searchResult && (
            <h1>
              No recipes found with that query. Please try again or enter a
              different one.
            </h1>
          )}
          {!initial && searchResult && (
            <div className="flex flex-col bg-white p-2">
              {searchResult.map((recipe) => (
                <Link
                  key={recipe._id}
                  href={`recipeScreen?recipeId=${recipe._id}`}>
                  <RecipeSearch name={recipe.name} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
