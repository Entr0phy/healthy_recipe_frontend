import { useState, useEffect } from "react";
import LowFatBadges from "./badgesComponent/lowFatBadges";
import LowCalorieBadges from "./badgesComponent/low_calorie";
import LowSodiumBadges from "./badgesComponent/lowSodium";
import HighProteinBadges from "./badgesComponent/high_protein";
import LowSugarGIBadges from "./badgesComponent/low_sugarGI";
import ReviewsBadges from "./badgesComponent/reviews";
import CustomiseBadges from "./badgesComponent/customise";
import VerifyBadges from "./badgesComponent/verify";
import CartBadges from "./badgesComponent/cart";
import { useRouter } from "next/router";
const Badges = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const homePage = () => router.push("./userProfileScreen");
  useEffect(() => {
    const fetchData = async () => {
      const username = JSON.parse(sessionStorage.getItem("userId")).username;
      const data = await fetch(
        `${process.env.apiKey}/auth/user/getUserByUsername/${username}`
      );
      const json = await data.json();
      setUserInfo(json);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col m-2">
      <h1 className="font-bold text-xl text-center">Badges</h1>
      {!userInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col my-4">
          <LowFatBadges low_fat={userInfo.badges.low_fat} />
          <LowCalorieBadges low_Calorie={userInfo.badges.low_calorie} />
          <LowSodiumBadges low_Sodium={userInfo.badges.low_sodium} />
          <HighProteinBadges high_protein={userInfo.badges.high_protein} />
          <LowSugarGIBadges low_SugarGI={userInfo.badges.low_sugarGI} />
          <ReviewsBadges Reviews={userInfo.badges.review} />
          <CustomiseBadges customise={userInfo.badges.customise} />
          <VerifyBadges verify={userInfo.badges.verify} />
          <CartBadges Cart={userInfo.badges.cart} />
        </div>
      )}
      <div>
        <button
          className="p-2 bg-zinc-100 border-2 rounded font-semibold m-2"
          onClick={homePage}>
          Back to Settings
        </button>
      </div>
    </div>
  );
};

export default Badges;
