import React from "react";
import GlobalStyle from "./styles/global";
import AppProvider from "./context";
import Routes from "./routes/router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
