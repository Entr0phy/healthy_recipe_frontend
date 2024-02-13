import HighProteinBronze1 from "../../../../public/assets/high_protein_bronze1.png";
import HighProteinBronze2 from "../../../../public/assets/high_protein_bronze2.png";
import HighProteinSilver1 from "../../../../public/assets/high_protein_silver1.png";
import HighProteinSilver2 from "../../../../public/assets/high_protein_silver2.png";
import HighProteinSilver3 from "../../../../public/assets/high_protein_silver3.png";
import HighProteinGold1 from "../../../../public/assets/high_protein_gold1.png";
import HighProteinGold2 from "../../../../public/assets/high_protein_gold2.png";
import HighProteinBronze1Grey from "../../../../public/assets/high_protein_bronze1_grey.png";
import HighProteinBronze2Grey from "../../../../public/assets/high_protein_bronze2_grey.png";
import HighProteinSilver1Grey from "../../../../public/assets/high_protein_silver1_grey.png";
import HighProteinSilver2Grey from "../../../../public/assets/high_protein_silver2_grey.png";
import HighProteinSilver3Grey from "../../../../public/assets/high_protein_silver3_grey.png";
import HighProteinGold1Grey from "../../../../public/assets/high_protein_gold1_grey.png";
import HighProteinGold2Grey from "../../../../public/assets/high_protein_gold2_grey.png";
import Image from "next/image";
const HighProteinBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold">High Protein Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.high_protein > 0
          ? imageContainer(HighProteinBronze1, "high-protein-bronze-1")
          : imageContainer(
              HighProteinBronze1Grey,
              "high-protein-bronze-1-grey"
            )}

        {props.high_protein >= 5
          ? imageContainer(HighProteinBronze2, "high-protein-bronze2")
          : imageContainer(HighProteinBronze2Grey, "high-protein-bronze2-grey")}

        {props.high_protein >= 10
          ? imageContainer(HighProteinSilver1, "high-protein-silver1")
          : imageContainer(HighProteinSilver1Grey, "high-protein-silver1-grey")}

        {props.high_protein >= 20
          ? imageContainer(HighProteinSilver2, "high-protein-silver2")
          : imageContainer(HighProteinSilver2Grey, "high-protein-silver2-grey")}
        {props.high_protein >= 40
          ? imageContainer(HighProteinSilver3, "high-protein-silver3")
          : imageContainer(HighProteinSilver3Grey, "high-protein-silver3-grey")}
        {props.high_protein >= 80
          ? imageContainer(HighProteinGold1, "high-protein-gold1")
          : imageContainer(HighProteinGold1Grey, "high-protein-gold1-grey")}
        {props.high_protein >= 160
          ? imageContainer(HighProteinGold2, "high-protein-gold2")
          : imageContainer(HighProteinGold2Grey, "high-protein-gold2-grey")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current High Protein Recipes Count:{" "}
        <span className="text-green-600">{props.high_protein}</span>
      </h1>
    </>
  );
};

export default HighProteinBadges;
