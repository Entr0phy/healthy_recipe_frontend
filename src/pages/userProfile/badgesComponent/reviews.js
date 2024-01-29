import reviewBronze from "../../../../public/assets/review_bronze.png";
import reviewSilver from "../../../../public/assets/review_silver.png";
import reviewGold from "../../../../public/assets/review_gold.png";
import Image from "next/image";
const ReviewsBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Reviews Achievements</h1>
      <div className="flex flex-wrap">
        {props.Reviews > 0 && imageContainer(reviewBronze, "Reviews-bronze")}

        {props.Reviews >= 30 && imageContainer(reviewSilver, "Reviews-silver")}

        {props.Reviews >= 150 &&
          imageContainer(reviewGold, "Reviews-gold")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current  Reviews Recipes Count:{" "}
        <span className="text-green-600">{props.Reviews}</span>
      </h1>
    </>
  );
};

export default ReviewsBadges;
