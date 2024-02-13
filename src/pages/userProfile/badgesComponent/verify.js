import verifyBronze from "../../../../public/assets/verify_bronze.png";
import verifySilver from "../../../../public/assets/verify_silver.png";
import verifyGold from "../../../../public/assets/verify_gold.png";
import verifyBronzeGrey from '../../../../public/assets/verify_bronze_grey.png'
import verifySilverGrey from '../../../../public/assets/verify_silver_grey.png'
import verifyGoldGrey from '../../../../public/assets/verify_gold_grey.png'
import Image from "next/image";
const VerifyBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Verify Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.verify > 0 ? imageContainer(verifyBronze, "verify-bronze") : imageContainer(verifyBronzeGrey, "verify-bronze-gray")}

        {props.verify >= 30 ? imageContainer(verifySilver, "verify-silver") : imageContainer(verifySilverGrey, 'verify-silver-gray')}

        {props.verify >= 150 ?
          imageContainer(verifyGold, "verify-gold") : imageContainer(verifyGoldGrey, 'verifyGoldGrey')}
      </div>
      <h1 className="font-bold text-center my-2">
        Current  Verify Recipes Count:{" "}
        <span className="text-green-600">{props.verify}</span>
      </h1>
    </>
  );
};

export default VerifyBadges;
