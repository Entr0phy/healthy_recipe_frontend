import lowFatBronze1 from "../../../../public/assets/low_fat_bronze1.png";
import lowFatBronze2 from "../../../../public/assets/low_fat_bronze2.png";
import lowFatSilver1 from "../../../../public/assets/low_fat_silver1.png";
import lowFatSilver2 from "../../../../public/assets/low_fat_silver2.png";
import lowFatSilver3 from "../../../../public/assets/low_fat_silver3.png";
import lowFatGold1 from "../../../../public/assets/low_fat_gold1.png";
import lowFatGold2 from "../../../../public/assets/low_fat_gold2.png";
import lowFatBronze1Grey from "../../../../public/assets/low_fat_bronze1_grey.png";
import lowFatBronze2Grey from "../../../../public/assets/low_fat_bronze2_grey.png";
import lowFatSilver1Grey from "../../../../public/assets/low_fat_silver1_grey.png";
import lowFatSilver2Grey from "../../../../public/assets/low_fat_silver2_grey.png";
import lowFatSilver3Grey from "../../../../public/assets/low_fat_silver3_grey.png";
import lowFatGold1Grey from "../../../../public/assets/low_fat_gold1_grey.png";
import lowFatGold2Grey from "../../../../public/assets/low_fat_gold2_grey.png";
import Image from "next/image";
const LowFatBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Fat Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.low_fat > 0
          ? imageContainer(lowFatBronze1, "low-fat-bronze-1")
          : imageContainer(lowFatBronze1Grey, "low-fat-bronze-1-grey")}

        {props.low_fat >= 5
          ? imageContainer(lowFatBronze2, "low-fat-bronze2")
          : imageContainer(lowFatBronze2Grey, "low-fat-bronze-2-grey")}

        {props.low_fat >= 10
          ? imageContainer(lowFatSilver1, "low-fat-silver1")
          : imageContainer(lowFatSilver1Grey, "low-fat-silver1-grey")}

        {props.low_fat >= 20
          ? imageContainer(lowFatSilver2, "low-fat-silver2")
          : imageContainer(lowFatSilver2Grey, "low-fat-silver-2")}
        {props.low_fat >= 40
          ? imageContainer(lowFatSilver3, "low-fat-silver3")
          : imageContainer(lowFatSilver3Grey, "low-fat-silver3-grey")}
        {props.low_fat >= 80
          ? imageContainer(lowFatGold1, "low-fat-gold1")
          : imageContainer(lowFatGold1Grey, "low-fat-gold1-grey")}
        {props.low_fat >= 160
          ? imageContainer(lowFatGold2, "low-fat-gold2")
          : imageContainer(lowFatGold2Grey, "low-fat-gold2-grey")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Fat Recipes Count:{" "}
        <span className="text-green-600">{props.low_fat}</span>
      </h1>
    </>
  );
};

export default LowFatBadges;
