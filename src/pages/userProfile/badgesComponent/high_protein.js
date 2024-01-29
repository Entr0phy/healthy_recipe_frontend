import HighProteinBronze1 from "../../../../public/assets/high_protein_bronze1.png";
import HighProteinBronze2 from "../../../../public/assets/high_protein_bronze2.png";
import HighProteinSilver1 from "../../../../public/assets/high_protein_silver1.png";
import HighProteinSilver2 from "../../../../public/assets/high_protein_silver2.png";
import HighProteinSilver3 from "../../../../public/assets/high_protein_silver3.png";
import HighProteinGold1 from "../../../../public/assets/high_protein_gold1.png";
import HighProteinGold2 from "../../../../public/assets/high_protein_gold2.png";
import Image from "next/image";
const HighProteinBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">Low Fat Achievements</h1>
      <div className="flex flex-wrap">
        {props.high_protein > 0 && imageContainer(HighProteinBronze1, "high-protein-bronze-1")}

        {props.high_protein >= 5 && imageContainer(HighProteinBronze2, "high-protein-bronze2")}

        {props.high_protein >= 10 &&
          imageContainer(HighProteinSilver1, "high-protein-silver1")}

        {props.high_protein >= 20 &&
          imageContainer(HighProteinSilver2, "high-protein-silver2")}
        {props.high_protein >= 40 &&
          imageContainer(HighProteinSilver3, "high-protein-silver3")}
        {props.high_protein >= 80 && imageContainer(HighProteinGold1, "high-protein-gold1")}
        {props.high_protein >= 160 && imageContainer(HighProteinGold2, "high-protein-gold2")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Low Fat Recipes Count:{" "}
        <span className="text-green-600">{props.high_protein}</span>
      </h1>
    </>
  );
};

export default HighProteinBadges;
