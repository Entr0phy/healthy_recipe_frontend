import { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/context";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image'
import logo from '../../public/assets/logo.png'

function NavLink({ to, children }) {
  return (
    <Link href={to} className={`mx-4`}>
      {children}
    </Link>
  );
}

function MobileNav({ open, setOpen }) {
  const [currentUser] = useContext(Context);

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
      <div className="flex items-center justify-center filter drop-shadow-md bg-zinc-100 h-20">
        {" "}
        {/*logo container*/}
        <Link className="text-xl font-semibold" href="/">
          Feed Your Physique
        </Link>
      </div>
      <div className="flex flex-col ml-4">
        {currentUser && (
          <>
            <Link
              className="inline-block bg-zinc-100 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-2"
              href="/recipe/searchRecipeScreen"
              onClick={() =>
                setTimeout(() => {
                  setOpen(!open);
                }, 100)
              }>
              Recipe
            </Link>
            <Link
              className="inline-block bg-zinc-100 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-2"
              href="/feed/feedScreen"
              onClick={() =>
                setTimeout(() => {
                  setOpen(!open);
                }, 100)
              }>
              Feed
            </Link>
          </>
        )}

        {!currentUser && (
          <Link
            className="inline-block bg-zinc-100 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-2"
            href="/logIn/logInScreen"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }>
            Log In
          </Link>
        )}
        {currentUser && (
          <Link
            className="inline-block bg-zinc-100 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-4"
            href="/userProfile/UserProfileScreen"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }>
            Settings
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [currentUser] = useContext(Context);
  const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // function handleLogin() {
  //   // perform login logic
  //   setIsLoggedIn(true);
  // }
  const userProfile = () => {
    router.push("/userProfile/userProfileScreen");
  };

  const recipe = () => {
    router.push("/recipe/searchRecipeScreen");
  };

  const feed = () => {
    router.push("/feed/feedScreen");
  };

  const index = () => {
    router.push("/");
  };

  const login = () => {
    router.push("/logIn/logInScreen");
  };
  return (
    <nav className="flex filter drop-shadow-md bg-zinc-200 px-4 py-4 h-20 items-center border-b-2">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <Image src={logo} alt="logo" onClick={index} className="h-10 object-contain"/>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}>
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex">
          {currentUser && (
            <>
              <button onClick={recipe} className="m-2 text-black-300 font-bold">
                Recipe
              </button>
              <button onClick={feed} className="m-2 text-black-300 font-bold">
                Feed
              </button>
            </>
          )}

          {/* {isLoggedIn ? (
            <img src="/user-icon.png" alt="User Icon" />
          ) : (
            <button onClick={handleLogin}>Log In</button>
          )} */}
          {currentUser && (
            <button
              onClick={userProfile}
              className="m-2 text-black-300 font-bold">
              Setting
            </button>
          )}
          {!currentUser && (
            <button onClick={login} className="m-2 text-black-300 font-bold">
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
