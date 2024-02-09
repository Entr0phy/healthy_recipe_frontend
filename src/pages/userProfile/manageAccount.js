import React from "react";
import { Context } from "../../store/context";
import { useContext } from "react";
import { useRouter } from "next/router";

const ManageAccount = () => {
  const [currentUser] = useContext(Context);
  const router = useRouter();
  const homePage = () => router.push("./userHome");
  return (
    <>
      <h1 className="font-bold text-xl p-2 text-center">{`${currentUser?.username} Account`}</h1>
      <div className="flex flex-col border-2 rounded border-grey-400 m-2">
        <ul className="m-2 font-semibold">
          <li>
            &#8226;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {`Username: ${currentUser?.username}`}
          </li>
          <li>
            &#8226;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`Email: ${currentUser?.email}`}
          </li>
        </ul>
      </div>

      <button className="p-2 bg-zinc-100 border-2 rounded font-semibold m-2" onClick={homePage}>Back to Settings</button>
    </>
  );
};

export default ManageAccount;
