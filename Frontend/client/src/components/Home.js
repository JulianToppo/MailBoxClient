import React from "react";
import ComposeEmail from "./ComposeEmail";

const Home = () => {
  return (
    <div className="flex justify-center flex-col items-center">
     
      <div>This is the mail box client</div>
      <ComposeEmail />
    </div>
  );
};

export default Home;
