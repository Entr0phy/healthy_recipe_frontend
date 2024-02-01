import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SubscriberPage from "./indexComponent/subscriberPage";
import FreeUserPage from "./indexComponent/freeUserPage";
export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    sessionStorage.getItem("userId") !== null && setLoggedIn(true);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-zinc-200 p-20">
        <h1 className="text-center text-3xl font-semibold text-gray-700 my-2">
          Feed Your Physique, Feed Your Future
        </h1>
        <p className="text-center text-gray-500">
          If you’re looking for recipes to meet your health goals, look no
          further. We cater to the anyone who seek to maintain a healthy
          lifestyle by providing easy-to-follow recipes and educational content
          about healthy eating
        </p>
      </div>

      {!loggedIn ? <FreeUserPage /> : <SubscriberPage />}
    </div>
  );
}
