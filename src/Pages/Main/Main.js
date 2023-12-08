import MyFriends from "./MyFriends";
import NavigationBar from "../../Components/Common/NavigationBar";

import { useState } from "react";
import AllUser from "./AllUser";
import ChatList from "./ChatList";

function Main() {
  const [state, setState] = useState("MYFRIENDS");

  let Component;

  switch (state) {
    case "MYFRIENDS":
      Component = <MyFriends />;
      break;
    case "CHATLIST":
      Component = <ChatList />;
      break;
    case "ALLUSER":
      Component = <AllUser />;
      break;
    default:
      Component = <div>404 Not Found</div>;
  }

  return (
    <>
      {Component}
      <NavigationBar state={state} setState={setState} />
    </>
  );
}

export default Main;
