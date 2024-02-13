import lowCalorieBronze1 from "../../../../public/assets/low_calorie_bronze1.png";
import lowCalorieBronze2 from "../../../../public/assets/low_calorie_bronze2.png";
import lowCalorieSilver1 from "../../../../public/assets/low_calorie_silver1.png";
import lowCalorieSilver2 from "../../../../public/assets/low_calorie_silver2.png";
import lowCalorieSilver3 from "../../../../public/assets/low_calorie_silver3.png";
import lowCalorieGold1 from "../../../../public/assets/low_calorie_gold1.png";
import lowCalorieGold2 from "../../../../public/assets/low_calorie_gold2.png";
import lowCalorieBronze1Grey from "../../../../public/assets/low_calorie_bronze1_grey.png";
import lowCalorieBronze2Grey from "../../../../public/assets/low_calorie_bronze2_grey.png";
import lowCalorieSilver1Grey from "../../../../public/assets/low_calorie_silver1_grey.png";
import lowCalorieSilver2Grey from "../../../../public/assets/low_calorie_silver2_grey.png";
import lowCalorieSilver3Grey from "../../../../public/assets/low_calorie_silver3_grey.png";
import lowCalorieGold1Grey from "../../../../public/assets/low_calorie_gold1_grey.png";
import lowCalorieGold2Grey from "../../../../public/assets/low_calorie_gold2_grey.png";
import Image from "next/image";
const LowCalorieBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Calorie Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.low_Calorie > 0
          ? imageContainer(lowCalorieBronze1, "low-Calorie-bronze-1")
          : imageContainer(lowCalorieBronze1Grey, "low-calorie-bronze1-grey")}

        {props.low_Calorie >= 5
          ? imageContainer(lowCalorieBronze2, "low-Calorie-bronze2")
          : imageContainer(lowCalorieBronze2Grey, "low-calorie-bronze2-grey")}

        {props.low_Calorie >= 10
          ? imageContainer(lowCalorieSilver1, "low-Calorie-silver1")
          : imageContainer(lowCalorieSilver1Grey, "low-calorie-silver1-grey")}

        {props.low_Calorie >= 20
          ? imageContainer(lowCalorieSilver2, "low-Calorie-silver2")
          : imageContainer(lowCalorieSilver2Grey, "low-calorie-silver2-grey")}
        {props.low_Calorie >= 40
          ? imageContainer(lowCalorieSilver3, "low-Calorie-silver3")
          : imageContainer(lowCalorieSilver3Grey, "low-calorie-silver3-grey")}
        {props.low_Calorie >= 80
          ? imageContainer(lowCalorieGold1, "low-Calorie-gold1")
          : imageContainer(lowCalorieGold1Grey, "low-calorie-gold1-grey")}
        {props.low_Calorie >= 160
          ? imageContainer(lowCalorieGold2, "low-Calorie-gold2")
          : imageContainer(lowCalorieGold2Grey, "low-calorie-gold2-grey")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Calorie Recipes Count:{" "}
        <span className="text-green-600">{props.low_Calorie}</span>
      </h1>
    </>
  );
};

export default LowCalorieBadges;
