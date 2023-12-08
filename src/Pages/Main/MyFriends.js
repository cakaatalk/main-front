import FriendsList from "../../Components/User/FriendsList";
import UserProfile from "../../Components/User/UserProfile";

function MyFriends() {
  return (
    <div>

      <h1 className="friend-text">친구 목록</h1>
      <UserProfile />

      <main className="friends-screen">
        <FriendsList />
      </main>

      <div id="no-mobile"></div>
    </div>
  );
}

export default MyFriends;
