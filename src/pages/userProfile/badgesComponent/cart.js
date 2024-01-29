import cart from "../../../../public/assets/cart.png";
import Image from "next/image";
const CartBadges = (props) => {
  const imageContainer = (src, alt) => {
    return <Image src={src} alt={alt} className="object-contain h-48 w-40" />;
  };
  return (
    <>
      <h1 className="text-center font-bold"> Cart Achievements</h1>
      <div className="flex flex-wrap">
        {props.Cart > 0 && imageContainer(cart, "Cart-bronze")}
      </div>
      <h1 className="font-bold text-center my-2">
        Current  Cart Recipes Count:{" "}
        <span className="text-green-600">{props.Cart}</span>
      </h1>
    </>
  );
};

export default CartBadges;
