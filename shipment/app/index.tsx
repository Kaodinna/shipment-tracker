import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import SplashScreen from "./spalshScreen";
import React from "react";

const Index = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Simulating a loading time (or you can check authentication status, fetch data, etc.)
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer); // Cleanup the timer when component unmounts
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return <Redirect href={"/login"} />;
};

export default Index;
