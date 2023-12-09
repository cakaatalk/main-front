import { useRef, useEffect, useState } from "react";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";
import ChatService from "../../API/ChatService";
import UserComponent from "../../Components/User/UserComponent";
import "../../css/components/addChatScreen.css";

function AddChat({ onClose }) {
    const popupRef = useRef();

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const [maxHeight, setMaxHeight] = useState("auto");
    const [friendsList, setFriendsList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    function updateMaxHeight() {
        const header = document.querySelector(".header");
        const footer = document.querySelector(".footer");

        if (header && footer) {
            const headerHeight = header.offsetHeight;
            const footerHeight = footer.offsetHeight;
            const newMaxHeight = window.innerHeight - headerHeight - footerHeight;
            setMaxHeight(`${newMaxHeight}px`);
        }
    }

    async function fetchFriends() {
        try {
          const response = await UserService.getFriendList();
          if (response && Array.isArray(response.users)) {
            setFriendsList(response.users);
          }
        } catch (error) {
          if (error.response) {
            try {
              const refreshResponse = await AuthService.refreshAccessToken();
              localStorage.setItem(
                "accessToken",
                refreshResponse.data.accessToken
              );
              return fetchFriends();
            } catch (refreshError) {
              console.error("Error refreshing token:", refreshError);
            }
          } else {
            console.error("Error fetching friends:", error);
          }
        }
      }

    const toggleUserSelection = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        fetchFriends();
        window.addEventListener("resize", updateMaxHeight);
        document.addEventListener("mousedown", handleClickOutside);
        updateMaxHeight();

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", updateMaxHeight);
        };
    }, [onClose]);

    const onAddChat = async () => {
        let roomId;
        try {
            roomId = await ChatService.getRoomId(selectedUsers);
            localStorage.setItem("roomId", roomId);
            window.location.href = `/chat`;
        } catch (error) {
            try {
                const refreshResponse = await AuthService.refreshAccessToken();
                localStorage.setItem("accessToken", refreshResponse.data.accessToken);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
            }
            console.log("채팅추가", selectedUsers);
        }
    }

        return (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(5px)",
            }} onClick={onClose}>
                <div style={{
                    position: "fixed",
                    top: "20%",
                    left: "30%",
                    width: "40%",
                    padding: "20px",
                    border: "1px solid black",
                    backgroundColor: "white",
                    zIndex: 101,
                }} onClick={stopPropagation} ref={popupRef}>
                    <div className="friends-list-container" style={{ maxHeight }}>
                        <div className="friends-header">
                            <h2 className="friends-list-title">친구{friendsList.length}</h2>
                        </div>
                        <div className="friends-list">
                            {friendsList.map((friend) => (
                                <UserComponent
                                    key={friend.id}
                                    avatar={friend.imageURL}
                                    name={friend.name}
                                    additionalContent={() => (
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(friend.id)}
                                                onChange={() => toggleUserSelection(friend.id)}
                                            />
                                            Select
                                        </label>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="friends-header">
                        <button onClick={() => onAddChat()}>채팅추가</button>
                    </div>
                </div>
            </div>
        )
    }
export default AddChat;