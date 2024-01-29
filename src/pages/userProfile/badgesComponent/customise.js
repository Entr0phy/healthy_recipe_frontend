import customiseBronze from "../../../../public/assets/customise_bronze.png";
import customiseSilver from "../../../../public/assets/customise_silver.png";
import customiseGold from "../../../../public/assets/customise_gold.png";
import Image from "next/image";
const CustomiseBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Customise Achievements</h1>
      <div className="flex flex-wrap">
        {props.customise > 0 && imageContainer(customiseBronze, "customise-bronze")}

        {props.customise >= 30 && imageContainer(customiseSilver, "customise-silver")}

        {props.customise >= 150 &&
          imageContainer(customiseGold, "customise-gold")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current  customise Recipes Count:{" "}
        <span className="text-green-600">{props.customise}</span>
      </h1>
    </>
  );
};

export default CustomiseBadges;
