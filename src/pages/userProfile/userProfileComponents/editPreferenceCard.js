import React from "react";

const EditPreferenceCard = (prop) => {
    return(
        <div className="flex flex-col border-2 rounded border-grey-300 p-2 m-2 ">
            <h2 className="font-bold text-xl">{prop.title}</h2>

            {prop.userDetails?.length ===0 && <h4 className="text-center font-semibold m-2">{`No ${prop.title}`}</h4>} 
            {prop.userDetails?.map((ele) => (
              <h4 key={Math.random()} className="font-semibold ml-2"> &nbsp;&#8226;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ele}</h4>
            ))}
            <div className="m-2 text-center">
            <button className="p-2 bg-zinc-200 rounded border-2 font-semibold" onClick={prop.redirect}>{`Edit ${prop.title}`}</button>
            </div>
          </div>
    )
}

export default EditPreferenceCard