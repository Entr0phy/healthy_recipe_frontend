import lowSugarGIBronze1 from "../../../../public/assets/low_sugarGI_bronze1.png";
import lowSugarGIBronze2 from "../../../../public/assets/low_sugarGI_bronze2.png";
import lowSugarGISilver1 from "../../../../public/assets/low_sugarGI_silver1.png";
import lowSugarGISilver2 from "../../../../public/assets/low_sugarGI_silver2.png";
import lowSugarGISilver3 from "../../../../public/assets/low_sugarGI_silver3.png";
import lowSugarGIGold1 from "../../../../public/assets/low_sugarGI_gold1.png";
import lowSugarGIGold2 from "../../../../public/assets/low_sugarGI_gold2.png";
import Image from "next/image";
const LowSugarGIBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low SugarGI Achievements</h1>
      <div className="flex flex-wrap">
        {props.low_SugarGI > 0 && imageContainer(lowSugarGIBronze1, "low-SugarGI-bronze-1")}

        {props.low_SugarGI >= 5 && imageContainer(lowSugarGIBronze2, "low-SugarGI-bronze2")}

        {props.low_SugarGI >= 10 &&
          imageContainer(lowSugarGISilver1, "low-SugarGI-silver1")}

        {props.low_SugarGI >= 20 &&
          imageContainer(lowSugarGISilver2, "low-SugarGI-silver2")}
        {props.low_SugarGI >= 40 &&
          imageContainer(lowSugarGISilver3, "low-SugarGI-silver3")}
        {props.low_SugarGI >= 80 && imageContainer(lowSugarGIGold1, "low-SugarGI-gold1")}
        {props.low_SugarGI >= 160 && imageContainer(lowSugarGIGold2, "low-SugarGI-gold2")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low SugarGI Recipes Count:{" "}
        <span className="text-green-600">{props.low_SugarGI}</span>
      </h1>
    </>
  );
};

export default LowSugarGIBadges;
