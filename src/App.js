import React, { useState, useContext, useEffect } from "react";
import LoginPage from "./Pages/Auth/LoginPage";

import "./css/components/scrollBar.css";
import "./css/components/styles.css";
import Main from "./Pages/Main/Main";
import Chat from "./Pages/Chat/Chat";
import AddChat from "./Pages/Chat/AddChat";

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
      Component = <Chat />;
      break;
    case "/addchat":
      Component = <AddChat />;
      break;
    default:
      Component = <div>404 Not Found</div>;
  }

  return <div>{Component}</div>;
}

export default App;
