import React from 'react';
import '../css/components/friends.css'; 

{/*REAMME 
avatar : 사용자의 프로필 이미지 URL 
name: 사용자의 이름. 텍스트로 표시
bold: 사용자 이름을 굵게 표시할지 여부
additionalContent: 추가적인 내용을 표시할 수 있는 옵션. (예: 버튼, 링크 등) 사용자 정보 옆에 렌더링.
*/}

function UserComponent({ avatar, name, subtitle, bold = true, additionalContent }) {
  return (
    <div className="user-component">
      <div className="user-component__column">
        <img src={avatar} className={`user-component__avatar ${bold ? 'user-component__avatar--xl' : 'user-component__avatar--sm'}`} alt={name} />
        <div className="user-component__text">
          <h4 className={`user-component__title ${!bold && 'user-component__title--not-bold'}`}>
            {name}
          </h4>
          {subtitle && <h6 className="user-component__subtitle">{subtitle}</h6>}
        </div>
      </div>
      {additionalContent && (
        <div className="user-component__column">
          {additionalContent}
        </div>
      )}
    </div>
  );
}


export default UserComponent;
