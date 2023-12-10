import React from "react";
import "../../css/components/navigationBar.css";

import friends from "../../assets/user.png";
import chats from "../../assets/speech-bubble.png";
import addFriends from "../../assets/add-friend-blue.png";

function NavigationBar({ state, setState }) {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__btn">
          <div
            className="nav__link"
            onClick={() => {
              setState("MYFRIENDS");
            }}
          >
            <img className="nav_icon" src={friends} />
          </div>
        </li>
        <li className="nav__btn">
          <div
            className="nav__link"
            onClick={() => {
              setState("CHATLIST");
            }}
          >
            {/* <span className="nav__notification badge">1</span> */}
            <img className="nav_icon" src={chats} />
          </div>
        </li>
        <li className="nav__btn">
          <div
            className="nav__link"
            onClick={() => {
              setState("ALLUSER");
            }}
          >
            <img className="nav_icon" src={addFriends} />
          </div>
        </li>
        {/* <li className="nav__btn">
          <div
            className="nav__link"
            onClick={() => {
              setState("ALLUSER");
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </div>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavigationBar;
