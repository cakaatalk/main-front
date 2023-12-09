import UserList from "../../Components/User/UserList";

function AllUser() {
  return (
    <div>
      <h1 className="friend-add">친구 추가</h1>
      <main className="main-screen more-screen">
          <UserList />
      </main>
      <div id="no-mobile"></div>
    </div>
  );
}

export default AllUser;
