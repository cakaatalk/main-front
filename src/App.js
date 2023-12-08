import React, { useState, useEffect } from "react";
import LoginPage from "./Pages/Auth/LoginPage";

import "./css/components/scrollBar.css";
import "./css/components/styles.css";
import Main from "./Pages/Main/Main";
import SignUp from "./Pages/SignUp/SignUp";
import FindAccount from "./Pages/FindAccount/FindAccount";

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };

  const renderComponent = () => {
    if (isAuthenticated()) {
      switch (route) {
        case "/":
        case "/login":
          return <LoginPage />;
        case "/main":
          return <Main />;
        case "/chat":
          // return <Chats />;
          return <div>Chat Page</div>; 
        case "/signUp":
          return <SignUp />;
        case "/findAccount":
          return <FindAccount />;
        default:
          return <div>404 Not Found</div>;
      }
    } else {
      return <LoginPage />;
    }
  };

  return <div>{renderComponent()}</div>;
}

export default App;