import { useRef, useEffect } from "react";

function ProfileUpdate({ onClose, image, comment, name }) {
  const popupRef = useRef();

  // 팝업 내부 클릭 이벤트를 중지하여 오버레이 클릭 이벤트와 구분
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // 오버레이 클릭 시 팝업 닫기
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "30%",
          width: "40%",
          padding: "20px",
          border: "1px solid black",
          backgroundColor: "white",
          zIndex: 101,
        }}
        onClick={stopPropagation}
        ref={popupRef}
      >
        hi
      </div>
    </div>
  );
}

export default ProfileUpdate;
