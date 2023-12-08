import React, { useState, } from "react";
import LoginPage from "./Pages/Auth/LoginPage";

import "./css/components/scrollBar.css";
import "./css/components/styles.css";
import Main from "./Pages/Main/Main";
import SignUp from "./Pages/SignUp/SignUp";
import FindAccount from "./Pages/FindAccount/FindAccount";

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  let Component;

  switch (route) {
    case "/":
      Component = <LoginPage />;
      break;
    case "/main":
      Component = <Main />;
      break;
    case "/chat":
      // Component = <Chats />; 
      break;
    case "/signUp":
      Component = <SignUp />;
      break;
      case "/findAccount":
        Component = <FindAccount />;
        break;  
    default:
      Component = <div>404 Not Found</div>;
  }

  return <div>{Component}</div>;
}

export default App;
