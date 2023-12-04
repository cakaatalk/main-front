import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../css/components/navigationBar.css";

function NavigationBar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__btn">
          <Link className="nav__link" to="/friends">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Link>
        </li>
        <li className="nav__btn">
          <Link className="nav__link" to="/chats">
            {/* <span className="nav__notification badge">1</span> */}
            <FontAwesomeIcon icon={faComment} size="2x" />
          </Link>
        </li>
        <li className="nav__btn">
          <Link className="nav__link" to="/more">
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
