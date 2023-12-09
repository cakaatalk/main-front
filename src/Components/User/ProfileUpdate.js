import { useRef, useEffect, useState } from "react";
import UserService from "../../API/UserService";
const baseURL = "http://localhost:8040";

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
      const response = await fetch(`${baseURL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      setImageUrl(`${baseURL}${data.imageUrl}`); // 서버로부터 받은 이미지 URL
      console.log(data.imageUrl);
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

      alert("Profile updated successfully");
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
        <div>
          <img
            src={imageUrl}
            alt="content"
            style={{ width: "100px", height: "100px" }}
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <textarea value={comment} onChange={handleCommentChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
