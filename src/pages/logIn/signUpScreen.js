import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Allergies from "../userProfile/userProfileComponents/allergies";
import Dieraty from "../userProfile/userProfileComponents/dietary";
import HealthGoals from "../userProfile/userProfileComponents/healthGoals";

export default function DisplayUserSignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState(null);
  const [allergy, setAllergy] = useState([]);
  const [healthGoals1, setHealthGoals1] = useState("");
  const [healthGoals2, setHealthGoals2] = useState("");
  const [healthGoals3, setHealthGoals3] = useState("");
  const [healthGoals4, setHealthGoals4] = useState("");
  const router = useRouter();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDietaryChangeVegetarian = () => {
    setDietaryPreference(["vegetarian"]);
  };

  const handleDietaryChangeVegan = () => {
    setDietaryPreference(["vegan"]);
  };

  const handleDietaryChangePescatarian = () => {
    setDietaryPreference(["pescatarian"]);
  };

  const handleDietaryChangeNothing = () => {
    setDietaryPreference(["None"]);
  };

  const pushToAllergyArray = (val) => {
    setAllergy((current) => [...new Set([...current, val])]);
  };

  const removeFromAllergyArray = (val) => {
    setAllergy((current) => {
      return current.filter((allergies) => allergies !== val);
    });
  };

  const handleHealthGoalChange1 = (e) => {
    setHealthGoals1(e.target.value);
  };

  const handleHealthGoalChange2 = (e) => {
    setHealthGoals2(e.target.value);
  };

  const handleHealthGoalChange3 = (e) => {
    setHealthGoals3(e.target.value);
  };

  const handleHealthGoalChange4 = (e) => {
    setHealthGoals4(e.target.value);
  };

  const createUser = async (e) => {
    e.preventDefault();
    const healthGoals = [];
    healthGoals1 === "" ? healthGoals : healthGoals.push(healthGoals1);
    healthGoals2 === "" ? healthGoals : healthGoals.push(healthGoals2);
    healthGoals3 === "" ? healthGoals : healthGoals.push(healthGoals3);
    healthGoals4 === "" ? healthGoals : healthGoals.push(healthGoals4);
    const createUser = await fetch(`${process.env.apiKey}/auth/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        dietary_preferences: dietaryPreference,
        allergies: allergy,
        health_goals: healthGoals,
      }),
    });
    if (createUser.status === 200) {
      window.alert("User created successfully, redirecting to log in page");
      router.push("logInScreen");
    } else window.alert("Error creating account");
  };
  return (
    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <Head>
        <title>Sign up</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Logo" /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Tell us more about you!
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="healthGoals"
                className="block text-sm font-medium">
                How can Feed Your Physique help you?
              </label>
              <HealthGoals
                healthGoals1={healthGoals1}
                handleHealthGoalChange1={handleHealthGoalChange1}
                healthGoals2={healthGoals2}
                handleHealthGoalChange2={handleHealthGoalChange2}
                healthGoals3={healthGoals3}
                handleHealthGoalChange3={handleHealthGoalChange3}
                healthGoals4={healthGoals4}
                handleHealthGoalChange4={handleHealthGoalChange4}
              />
            </div>

            <Dieraty
              handleDietaryChangeVegetarian={handleDietaryChangeVegetarian}
              handleDietaryChangeVegan={handleDietaryChangeVegan}
              handleDietaryChangePescatarian={handleDietaryChangePescatarian}
              handleDietaryChangeNothing={handleDietaryChangeNothing}
              dietaryPreference={dietaryPreference}
            />
    
            <div>
              <label htmlFor="allergies" className="block text-l font-medium">
                Do let us know what you can&apos;t or prefer not to eat
              </label>
              <div className="mt-1">
                <Allergies
                  parentAllergy={allergy}
                  setParentAllergy={pushToAllergyArray}
                  removeParentAllergy={removeFromAllergyArray}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={createUser}>
                Sign up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <div className="text-sm mt-6">
              <Link
                href="/UserLogInScreen"
                className="font-medium text-gold-600 hover:text-amber-500">
                Go back to log in page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
