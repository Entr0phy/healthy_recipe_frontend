import lowSodiumBronze1 from "../../../../public/assets/low_sodium_bronze1.png";
import lowSodiumBronze2 from "../../../../public/assets/low_sodium_bronze2.png";
import lowSodiumSilver1 from "../../../../public/assets/low_sodium_silver1.png";
import lowSodiumSilver2 from "../../../../public/assets/low_sodium_silver2.png";
import lowSodiumSilver3 from "../../../../public/assets/low_sodium_silver3.png";
import lowSodiumGold1 from "../../../../public/assets/low_sodium_gold1.png";
import lowSodiumGold2 from "../../../../public/assets/low_sodium_gold2.png";
import lowSodiumBronze1Grey from "../../../../public/assets/low_sodium_bronze1_grey.png";
import lowSodiumBronze2Grey from "../../../../public/assets/low_sodium_bronze2_grey.png";
import lowSodiumSilver1Grey from "../../../../public/assets/low_sodium_silver1_grey.png";
import lowSodiumSilver2Grey from "../../../../public/assets/low_sodium_silver2_grey.png";
import lowSodiumSilver3Grey from "../../../../public/assets/low_sodium_silver3_grey.png";
import lowSodiumGold1Grey from "../../../../public/assets/low_sodium_gold1_grey.png";
import lowSodiumGold2Grey from "../../../../public/assets/low_sodium_gold2_grey.png";
import Image from "next/image";
const LowSodiumBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Sodium Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.low_Sodium > 0 ? imageContainer(lowSodiumBronze1, "low-Sodium-bronze-1") : imageContainer(lowSodiumBronze1Grey, 'low-sodium-bronze-1-grey')}

        {props.low_Sodium >= 5 ? imageContainer(lowSodiumBronze2, "low-Sodium-bronze2") : imageContainer(lowSodiumBronze2Grey, 'low-sodium-bronze2-grey')}

        {props.low_Sodium >= 10 ?
          imageContainer(lowSodiumSilver1, "low-Sodium-silver1"): imageContainer(lowSodiumSilver1Grey, 'low-sodium-silver1-grey')}

        {props.low_Sodium >= 20 ?
          imageContainer(lowSodiumSilver2, "low-Sodium-silver2") : imageContainer(lowSodiumSilver2Grey, 'low-sodium-silver2-grey')}
        {props.low_Sodium >= 40 ?
          imageContainer(lowSodiumSilver3, "low-Sodium-silver3") : imageContainer(lowSodiumSilver3Grey, 'low-sodium-silver3-grey')}
        {props.low_Sodium >= 80 ? imageContainer(lowSodiumGold1, "low-Sodium-gold1") : imageContainer(lowSodiumGold1Grey, 'low-sodium-gold1-grey')}
        {props.low_Sodium >= 160 ? imageContainer(lowSodiumGold2, "low-Sodium-gold2"):imageContainer(lowSodiumGold2Grey, 'low-sodium-gold2-grey')}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Sodium Recipes Count:{" "}
        <span className="text-green-600">{props.low_Sodium}</span>
      </h1>
    </>
  );
};

export default LowSodiumBadges;
