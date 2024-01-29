import lowCalorieBronze1 from "../../../../public/assets/low_calorie_bronze1.png";
import lowCalorieBronze2 from "../../../../public/assets/low_calorie_bronze2.png";
import lowCalorieSilver1 from "../../../../public/assets/low_calorie_silver1.png";
import lowCalorieSilver2 from "../../../../public/assets/low_calorie_silver2.png";
import lowCalorieSilver3 from "../../../../public/assets/low_calorie_silver3.png";
import lowCalorieGold1 from "../../../../public/assets/low_calorie_gold1.png";
import lowCalorieGold2 from "../../../../public/assets/low_calorie_gold2.png";
import Image from "next/image";
const LowCalorieBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Calorie Achievements</h1>
      <div className="flex flex-wrap">
        {props.low_Calorie > 0 && imageContainer(lowCalorieBronze1, "low-Calorie-bronze-1")}

        {props.low_Calorie >= 5 && imageContainer(lowCalorieBronze2, "low-Calorie-bronze2")}

        {props.low_Calorie >= 10 &&
          imageContainer(lowCalorieSilver1, "low-Calorie-silver1")}

        {props.low_Calorie >= 20 &&
          imageContainer(lowCalorieSilver2, "low-Calorie-silver2")}
        {props.low_Calorie >= 40 &&
          imageContainer(lowCalorieSilver3, "low-Calorie-silver3")}
        {props.low_Calorie >= 80 && imageContainer(lowCalorieGold1, "low-Calorie-gold1")}
        {props.low_Calorie >= 160 && imageContainer(lowCalorieGold2, "low-Calorie-gold2")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Calorie Recipes Count:{" "}
        <span className="text-green-600">{props.low_Calorie}</span>
      </h1>
    </>
  );
};

export default LowCalorieBadges;
