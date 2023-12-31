import { useRef, useEffect, useState } from "react";
import UserService from "../../API/UserService";
import env from "../Common/dotenv";

function ProfileUpdate({ onClose, origin_image, origin_comment, name }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(origin_image);
  const [comment, setComment] = useState(origin_comment);
  const popupRef = useRef();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      alert("File size should be less than 2MB.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${env.REACT_APP_IMAGE_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      setImageUrl(`${env.REACT_APP_IMAGE_BASE_URL}${data.imageUrl}`); // 서버로부터 받은 이미지 URL
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  // 팝업 내부 클릭 이벤트를 중지하여 오버레이 클릭 이벤트와 구분
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSave = async () => {
    try {
      const response = await UserService.updateProfile(imageUrl, comment);
      console.log(response.ok);
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      window.location.reload();
      onClose();
    } catch (error) {
      console.error(error);
    }
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 101,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "30%",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
        onClick={stopPropagation}
        ref={popupRef}
      >
        <div style={{ marginBottom: "20px" }}>
          <img
            src={imageUrl}
            alt="content"
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
          <input
            id="fileInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileInput"
            style={{
              display: "block",
              width: "90%",
              padding: "10px",
              marginTop: "10px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid #0054a6",
              backgroundColor: "#0054a6",
              color: "white",
              cursor: "pointer",
            }}
          >
            이미지 선택
          </label>
          <div className="comment-profile">
            마땅한 프로필 사진이 없으신가요?
            <br />
            지금 만들어보세요!{" "}
            <button
              onClick={() => {
                window.open("http://chito.aolda.net/", "_blank");
              }}
              style={{
                width: "110px",
                padding: "3px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#91b1db",
                color: "white",
                cursor: "pointer",
              }}
            >
              프로필 만들러 가기
            </button>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>{name}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            style={{
              width: "90%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              resize: "vertical",
              minHeight: "20px", // 줄인 텍스트 영역 높이
            }}
          />
        </div>
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#0054a6",
            color: "white",
            cursor: "pointer",
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default ProfileUpdate;
