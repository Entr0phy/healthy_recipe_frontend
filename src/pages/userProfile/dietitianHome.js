import React, { useContext } from "react";
import { Context } from '../../store/context'
import { useRouter } from 'next/router'
import UserHome from "./userHome";

const DietitianHome = () => {
    const [currentUser] = useContext(Context);
    const router = useRouter();

    const verifyRecipe = () => {
        router.push('./verifyRecipe')
    }

    return(
        <>
        <h1 className="font-bold text-center m-2 text-xl">Welcome to your dietitian dashboard!</h1>
        <div className="flex flex-col p-2 justify-center items-center">
            <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between" onClick={verifyRecipe}>
                <h2>Verify Recipe</h2>
                <h1>{">"}</h1>
            </div>

            <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between">
                <h2>Edit Profile</h2>
                <h1>{">"}</h1>
            </div>

            <div className="w-80 md:w-2/5 p-2 border-2 bg-gray-300 mx-auto rounded flex justify-between">
                <h2>View My Recipes</h2>
                <h1>{">"}</h1>
            </div>
        </div>

        <UserHome/>
        </>
    )
}

export default DietitianHome