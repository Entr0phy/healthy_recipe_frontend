import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DisplayUserSignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [allergy, setAllergy] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const router = useRouter();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleDietaryChange = (e) => {
    setDietaryPreference(e.target.value);
  };

  const handleAllergyChange = (e) => {
    setAllergy(e.target.value)
  }

  const handleHealthGoalChange = (e) => {
    setHealthGoals(e.target.value)
  }

  const createUser = async (e) => {
    e.preventDefault();
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
        dietaryPreferences: dietaryPreference,
        allergies: allergy,
        healthGoals: healthGoals
      }),
    });
    if (createUser.status === 200) {
      window.alert("User created successfully, redirecting to log in page");
      router.push("logInScreen");
    } else window.alert("Error creating account");
  };
  return (
    <div className=" bg-blue-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <Head>
        <title>Sign up</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Logo" /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400">
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400">
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400">
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
                htmlFor="dietary"
                className="block text-sm font-medium text-gray-400">
                Dietary Preferences
              </label>
              <div className="mt-1">
                <input
                  id="dietaryPreference"
                  name="dietaryPreference"
                  type="dietaryPreference"
                  value={dietaryPreference}
                  onChange={handleDietaryChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-gray-400">
                Allergies
              </label>
              <div className="mt-1">
                <input
                  id="allergies"
                  name="allergies"
                  type="allergies"
                  value={allergy}
                  onChange={handleAllergyChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="healthGoals"
                className="block text-sm font-medium text-gray-400">
                Health Goals
              </label>
              <div className="mt-1">
                <input
                  id="healthGoals"
                  name="healthGoals"
                  type="healthGoals"
                  value={healthGoals}
                  onChange={handleHealthGoalChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
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
