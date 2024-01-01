import React, { useEffect, useState } from "react";
import RecipeForm from "./recipeComponent/recipeForm";

const CreateRecipe = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("userId"))?._id;
        setUserId(user);
    }, []);

    return (
        <div className="flex flex-col text-center m-2">
            <h1 className="font-bold text-xl">Create Recipe</h1>
            <RecipeForm user={userId} />
        </div>
    );
};

export default CreateRecipe;
