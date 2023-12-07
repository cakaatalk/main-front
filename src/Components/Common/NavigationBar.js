import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComment,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/components/navigationBar.css";

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
            <FontAwesomeIcon icon={faUser} size="2x" />
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
            <FontAwesomeIcon icon={faComment} size="2x" />
          </div>
        </li>
        <li className="nav__btn">
          <div
            className="nav__link"
            onClick={() => {
              setState("ALLUSER");
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
