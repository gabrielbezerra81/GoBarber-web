import React from "react";
import GlobalStyle from "./styles/global";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  return (
    <>
      <SignIn />
      {/* <SignUp /> */}
      <GlobalStyle />
    </>
  );
};

export default App;
