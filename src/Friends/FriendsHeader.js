import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog, faInfoCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../css/components/friendsHeader.css"

function FriendsHeader() {
  return (
    <>
      <header className="screen-header">
        <h1 className="screen-header__title">친구 목록</h1>
        <div className="screen-header__icons">
          <FontAwesomeIcon icon={faSearch} size="lg" />
          {/*<FontAwesomeIcon icon={faMusic} size="lg" />*/}
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      </header>

      <a id="friends-display-link">
        {/* <FontAwesomeIcon icon={faInfoCircle} /> 친구 목록 */}
        {/* <FontAwesomeIcon icon={faChevronRight} size="xs" /> */}
      </a>
    </>
  );
}

export default FriendsHeader;
