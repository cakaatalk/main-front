import React from "react";
import "../../css/components/chatHeader.css";

function ChatHeader({ title }) {
  return (
    <header className="alt-header">
      <div className="alt-header__column">
        <h1 className="alt-header__title">{title}</h1>
      </div>
      <h1> </h1>

      {/* <div>
        <h1 >{title}</h1>
      </div> */}
      {/* <div className="alt-header__column">
        <FontAwesomeIcon icon={faSearch} size="lg" />
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div> */}
    </header>
  );
}

export default ChatHeader;
