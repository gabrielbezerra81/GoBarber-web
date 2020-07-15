import React from "react";
import GlobalStyle from "./styles/global";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import AuthProvider from "./context/authContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
        {/* <SignUp /> */}
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
