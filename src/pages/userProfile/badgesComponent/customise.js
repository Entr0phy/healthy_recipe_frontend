import customiseBronze from "../../../../public/assets/customise_bronze.png";
import customiseSilver from "../../../../public/assets/customise_silver.png";
import customiseGold from "../../../../public/assets/customise_gold.png";
import customiseBronzeGray from "../../../../public/assets/customise_bronze_grey.png";
import customiseSilverGray from "../../../../public/assets/customise_silver_grey.png";
import customiseGoldGray from "../../../../public/assets/customise_gold_grey.png";
import Image from "next/image";
const CustomiseBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Customise Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.customise > 0
          ? imageContainer(customiseBronze, "customise-bronze")
          : imageContainer(customiseBronzeGray, "customise-bronze-gray")}

        {props.customise >= 30
          ? imageContainer(customiseSilver, "customise-silver")
          : imageContainer(customiseSilverGray, "customise-silver-gray")}

        {props.customise >= 150
          ? imageContainer(customiseGold, "customise-gold")
          : imageContainer(customiseGoldGray, "customise-gold-gray")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current customise Recipes Count:{" "}
        <span className="text-green-600">{props.customise}</span>
      </h1>
    </>
  );
};

export default CustomiseBadges;
