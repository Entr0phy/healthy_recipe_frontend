import { useState } from "react";
import RecipeSearch from "./recipeComponent/recipeSearch";
import Link from "next/link";
import RecipeTags from "./recipeComponent/recipeTags";
import RecipeSort from "./recipeComponent/recipeSort";
export default function RecipeScreen() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [filter, setFilter] = useState([]);
  const [filterButton, setFilterButton] = useState(false);
  const [sortButton, setSortButton] = useState(false);
  const [sort, setSort] = useState("");
  const [initial, setInitial] = useState(true);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const addToTags = (tag) => {
    filter?.indexOf(tag) === -1 ? setFilter((prev) => [...prev, tag]) : filter;
  };

  const removeTags = (e, tag) => {
    e.preventDefault();
    const removedTags = filter.filter((item) => item !== tag);
    setFilter(removedTags);
  };

  const handleSortButton = (e) => {
    e.preventDefault();
    setSortButton((prev) => !prev);
  };

  const sortChange = (newSort) => {
    sort === newSort ? setSort("") : setSort(newSort);
  };

  const handleFilterButton = (e) => {
    e.preventDefault();
    setFilterButton((prev) => !prev);
  };

  const recipeSearch = async () => {
    setInitial(false);

    const recipe = await fetch(`${process.env.apiKey}/recipe/searchRecipe`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search, tags: filter, sort: sort }),
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
    <div className="flex flex-col justify-center py-6 sm:px-6 pg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>
      <div className="mt-8">
        <div className="mt-1 flex flex-row my-2">
          <input
            id="recipeSearch"
            name="recipeSearch"
            type="recipeSearch"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="appearance-none block w-full px-5 py-2 border rounded-full border-2 border-grey-400"
          />
          <div className="flex pl-4">
            <button
              className="bg-white p-2 rounded font-bold text-slate-700 bg-gray-400 mx-2"
              onClick={handleFilterButton}>
              Filter
            </button>

            <button
              className="bg-white p-2 rounded font-bold text-slate-700 bg-gray-400 mx-2"
              onClick={handleSortButton}>
              Sort
            </button>

            <button
              onClick={recipeSearch}
              className="bg-white p-2 rounded font-bold text-slate-700 bg-gray-400 mx-2">
              Search
            </button>
          </div>
        </div>

        {filterButton && (
          <div className="bg-gray-200 rounded p-2">
            <h1 className="font-semibold">Selected Filters</h1>
            {filter.map((ele) => (
              <div key={Math.random()} className="flex place-content-between">
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
            {filter.length === 0 && (
              <h1 className="font-bold text-red-600 my-2">No Filter Added</h1>
            )}
            <RecipeTags addToTag={addToTags} />
          </div>
        )}

        {sortButton && (
          <div className="bg-gray-200 rounded p-2 my-2">
            <h1 className="font-semibold">Current Sort: {sort}</h1>
            <RecipeSort filter={sortChange} />
          </div>
        )}

        <div className="my-2">
          {!initial && !searchResult && (
            <h1>
              No recipes found with that query. Please try again or enter a
              different one.
            </h1>
          )}
          {!initial && searchResult && (
            <div className="flex flex-col bg-white">
              {searchResult?.map((recipe) => (
                <Link
                  key={recipe._id}
                  href={`recipeScreen?recipeId=${recipe._id}`}>
                  <RecipeSearch
                    name={recipe.name}
                    image={recipe.image_url}
                    tags={recipe.tags}
                    description={recipe.description}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
