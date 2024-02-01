import React from "react"
import Image from 'next/image'
const RecipeSearch = (props) => {
    return (
        <div className="flex flex-wrap border-2 border-grey-400 rounded">
            <div className="mb-4 h-64 w-64 border-8 p-2 m-2">
                <Image className="h-full w-full object-cover " src={props.image} alt="recipe image"/>
            </div>
            <div className="flex flex-col ml-2">
                <div className="flex flex-wrap">
                {props?.tags?.map((ele)=>
                    <h4 className="m-2 font-semibold p-2 border-2 rounded" key={Math.random()}>{ele}</h4>
                )}
                </div>
                <h1 className="text-2xl font-bold m-2">{props.name}</h1>
                <p className="m-2">{props.description}</p>
            </div>
        </div>
    )
}

export default RecipeSearch