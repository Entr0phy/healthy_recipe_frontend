import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import landingPage from '../../../public/assets/landing_page.jpg'
import Image from 'next/image'
const FreeUserPage = () => {
  const [featured, setFeatured] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getFeaturedRecipe = async () => {
      const data = await fetch(`${process.env.apiKey}/recipe/featuredRecipe`);
      const json = await data.json();
      setFeatured(json);
    };
    getFeaturedRecipe();
  }, []);
  const redirectToFreshRecipe = (val) => {
    router.push(`./recipe/recipeScreen?recipeId=${val}`);
  };

  const redirectToSignUpPage = () => {
    router.push('/logIn/signUpScreen')
  }
  return (
    <div className="bg-zinc-100">
      {/* Header row with "Fresh content" and "See all" */}
      <div className="flex justify-between items-center px-6 py-4 my-2">
        <h1 className="text-2xl font-bold text-gray-800 mx-auto">
          Some of our recipes
        </h1>
      </div>

      {!featured ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-between px-6">
          {featured.query.slice(0, 3).map((recipe) => (
            <div
              key={recipe._id}
              className="w-full md:w-1/3 lg:w-1/4 p-4 flex flex-col items-center"
              onClick={() => redirectToFreshRecipe(recipe._id)}>
              <Image
                src={recipe.image_url}
                alt={recipe.name}
                className="object-cover w-full h-48 mb-2"
              />
              <h3 className="font-bold text-lg text-[#097969] text-center">
                {recipe.name}
              </h3>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Our Features
      </h2>

      <div className="flex flex-wrap items-start px-6">
        {/* Picture on the left */}
        <div className="w-full md:w-1/3 p-4">
          <Image
            src={landingPage}
            alt="Big Image"
            className="w-full h-auto"
          />
        </div>

        {/* Card-like containers on the right */}
        <div className="w-full md:w-2/3 flex flex-wrap justify-between p-4">
          {/* Card 1 */}
          <div className="w-full md:w-1/2 p-2">
            {" "}
            {/* Adjusted width and removed margin */}
            <div className="rounded-lg shadow p-6">
              <p className="text-green-700">
                <strong>Diverse collection of healthy recipes</strong>
                <br />
                Detailed easy to follow, fool-proof <br />
                recipes with more than enough variety
                <br />
                to satisfy every little craving you might <br />
                have but still help you chase your health
                <br />
                goals
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full md:w-1/2 p-2">
            {" "}
            {/* Adjusted width and removed margin */}
            <div className="rounded-lg shadow p-6">
              <p className="text-red-700">
                <strong>Responsive and user-friendly web interface</strong>
                <br />
                Be a part of the healthy movement with
                <br />
                us whether or not you might be IT-savvy.
                <br />
                Our user interface is user-friendly <br />
                and also accessible and transits seamlessly
                <br />
                between your smartphone to your tablets to
                <br />
                your home computers.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full md:w-1/2 p-2">
            {" "}
            {/* Adjusted width and removed margin */}
            <div className="rounded-lg shadow p-6">
              <p className="text-blue-700">
                <strong>Cater recipes to your liking</strong>
                <br />
                Tell us your preferences and allergies
                <br />
                down to the most minute detail! We`&apos;`ll
                <br />
                whip up a homepage that suits your
                <br />
                liking.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full md:w-1/2 p-2">
            {" "}
            {/* Adjusted width and removed margin */}
            <div className="rounded-lg shadow p-6">
              <p className="text-yellow-700">
                <strong>Be a part of a community of kindred spirits</strong>
                <br />
                Starting your journey on healthy eating <br />
                from home can be hard on your own.
                <br />
                Join us to keep in touch with others also
                <br />
                on the same path to eating towards a <br />
                healthier future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#097969] text-center mb-6">
        Our Plans
      </h2>

      <div className="w-full md:w-3/5 p-10 mx-auto mt-[-3rem]">
        <div className="rounded-lg shadow p-6 bg-white text-center">
          <p className="text-[#097969] font-bold text-lg mb-2">
            BE A SUBSCRIBER
          </p>
          <h2 className="text-[#097969] text-2xl font-extrabold mb-4">
            $30 SGD/Month
          </h2>
          <div className="border-b border-gray-300 my-4"></div>
          <div className="text-[#097969] mb-4 text-left pl-8">
            <ul className="list-disc ml-5">
              <li>Full access to recipes</li>
              <li>Customize recipes to your liking</li>
              <li>Add recipe ingredients to a shopping list</li>
              <li>Leave reviews for recipes</li>
              <li>Be a part of something great!</li>
            </ul>
          </div>
          <button className="bg-black text-white py-2 px-4 rounded" onClick={redirectToSignUpPage}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeUserPage;
