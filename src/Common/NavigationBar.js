import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment, faSearch, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__btn">
          <a className="nav__link" href="friends.html">  {/* 이렇게 링크형식으로 해도 되나? */}
            <FontAwesomeIcon icon={faUser} size="2x" /> 
          </a>
        </li>
        <li className="nav__btn">
          <a className="nav__link" href="chats.html">
            <span className="nav__notification badge">1</span>
            <FontAwesomeIcon icon={faComment} size="2x" />
          </a>
        </li>
        <li className="nav__btn">
          <a className="nav__link" href="find.html">
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </a>
        </li>
        <li className="nav__btn">
          <a className="nav__link" href="more.html">
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
