import FriendsList from "../../Components/User/FriendsList";
import UserProfile from "../../Components/User/UserProfile";

function MyFriends() {
  return (
    <div>
    <div className="friends-header">
      <h1 className="friend-text">친구</h1>
    </div>
      <UserProfile />
      <main className="friends-screen">
        <FriendsList />
      </main>

      <div id="no-mobile"></div>
    </div>
  );
}

export default MyFriends;
