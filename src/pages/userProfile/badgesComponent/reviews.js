import reviewBronze from "../../../../public/assets/review_bronze.png";
import reviewSilver from "../../../../public/assets/review_silver.png";
import reviewGold from "../../../../public/assets/review_gold.png";
import reviewBronzeGrey from "../../../../public/assets/review_bronze_grey.png";
import reviewSilverGrey from "../../../../public/assets/review_silver_grey.png";
import reviewGoldGrey from "../../../../public/assets/review_gold_grey.png";
import Image from "next/image";
const ReviewsBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Reviews Achievements</h1>
      <div className="flex flex-wrap justify-center items-center">
        {props.Reviews > 0
          ? imageContainer(reviewBronze, "Reviews-bronze")
          : imageContainer(reviewBronzeGrey, "review-bronze-grey")}

        {props.Reviews >= 30
          ? imageContainer(reviewSilver, "Reviews-silver")
          : imageContainer(reviewSilverGrey, "review_silver_grey")}

        {props.Reviews >= 150
          ? imageContainer(reviewGold, "Reviews-gold")
          : imageContainer(reviewGoldGrey, "review-gold-grey")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current Reviews Recipes Count:{" "}
        <span className="text-green-600">{props.Reviews}</span>
      </h1>
    </>
  );
};

export default ReviewsBadges;
