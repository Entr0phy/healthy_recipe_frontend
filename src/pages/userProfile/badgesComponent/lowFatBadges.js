import lowFatBronze1 from "../../../../public/assets/low_fat_bronze1.png";
import lowFatBronze2 from "../../../../public/assets/low_fat_bronze2.png";
import lowFatSilver1 from "../../../../public/assets/low_fat_silver1.png";
import lowFatSilver2 from "../../../../public/assets/low_fat_silver2.png";
import lowFatSilver3 from "../../../../public/assets/low_fat_silver3.png";
import lowFatGold1 from "../../../../public/assets/low_fat_gold1.png";
import lowFatGold2 from "../../../../public/assets/low_fat_gold2.png";
import Image from "next/image";
const LowFatBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Fat Achievements</h1>
      <div className="flex flex-wrap">
        {props.low_fat > 0 && imageContainer(lowFatBronze1, "low-fat-bronze-1")}

        {props.low_fat >= 5 && imageContainer(lowFatBronze2, "low-fat-bronze2")}

        {props.low_fat >= 10 &&
          imageContainer(lowFatSilver1, "low-fat-silver1")}

        {props.low_fat >= 20 &&
          imageContainer(lowFatSilver2, "low-fat-silver2")}
        {props.low_fat >= 40 &&
          imageContainer(lowFatSilver3, "low-fat-silver3")}
        {props.low_fat >= 80 && imageContainer(lowFatGold1, "low-fat-gold1")}
        {props.low_fat >= 160 && imageContainer(lowFatGold2, "low-fat-gold2")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Fat Recipes Count:{" "}
        <span className="text-green-600">{props.low_fat}</span>
      </h1>
    </>
  );
};

export default LowFatBadges;
