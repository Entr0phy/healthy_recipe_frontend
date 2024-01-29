import lowSodiumBronze1 from "../../../../public/assets/low_sodium_bronze1.png";
import lowSodiumBronze2 from "../../../../public/assets/low_sodium_bronze2.png";
import lowSodiumSilver1 from "../../../../public/assets/low_sodium_silver1.png";
import lowSodiumSilver2 from "../../../../public/assets/low_sodium_silver2.png";
import lowSodiumSilver3 from "../../../../public/assets/low_sodium_silver3.png";
import lowSodiumGold1 from "../../../../public/assets/low_sodium_gold1.png";
import lowSodiumGold2 from "../../../../public/assets/low_sodium_gold2.png";
import Image from "next/image";
const LowSodiumBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Sodium Achievements</h1>
      <div className="flex flex-wrap">
        {props.low_Sodium > 0 && imageContainer(lowSodiumBronze1, "low-Sodium-bronze-1")}

        {props.low_Sodium >= 5 && imageContainer(lowSodiumBronze2, "low-Sodium-bronze2")}

        {props.low_Sodium >= 10 &&
          imageContainer(lowSodiumSilver1, "low-Sodium-silver1")}

        {props.low_Sodium >= 20 &&
          imageContainer(lowSodiumSilver2, "low-Sodium-silver2")}
        {props.low_Sodium >= 40 &&
          imageContainer(lowSodiumSilver3, "low-Sodium-silver3")}
        {props.low_Sodium >= 80 && imageContainer(lowSodiumGold1, "low-Sodium-gold1")}
        {props.low_Sodium >= 160 && imageContainer(lowSodiumGold2, "low-Sodium-gold2")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Sodium Recipes Count:{" "}
        <span className="text-green-600">{props.low_Sodium}</span>
      </h1>
    </>
  );
};

export default LowSodiumBadges;
