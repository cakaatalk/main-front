import UserList from "../../Components/User/UserList";

function AllUser() {
  return (
    <div>
      <div className="friends-header">
        <h1 className="friend-text">친구 추가</h1>
      </div>
      <main className="main-screen more-screen">
          <UserList />
      </main>
      <div id="no-mobile"></div>
    </div>
  );
}

export default AllUser;
