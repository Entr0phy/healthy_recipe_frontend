import verifyBronze from "../../../../public/assets/verify_bronze.png";
import verifySilver from "../../../../public/assets/verify_silver.png";
import verifyGold from "../../../../public/assets/verify_gold.png";
import Image from "next/image";
const VerifyBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Verify Achievements</h1>
      <div className="flex flex-wrap">
        {props.verify > 0 && imageContainer(verifyBronze, "verify-bronze")}

        {props.verify >= 30 && imageContainer(verifySilver, "verify-silver")}

        {props.verify >= 150 &&
          imageContainer(verifyGold, "verify-gold")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current  Verify Recipes Count:{" "}
        <span className="text-green-600">{props.verify}</span>
      </h1>
    </>
  );
};

export default VerifyBadges;
