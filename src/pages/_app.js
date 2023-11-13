import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { Context } from "../store/context";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = sessionStorage.getItem("userId");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);
  return (
    <Context.Provider value={[currentUser, setCurrentUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
