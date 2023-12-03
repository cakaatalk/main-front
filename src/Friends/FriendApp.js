import NavigationBar from '../Common/NavigationBar';
import FriendsList from './FriendsList';
import UserProfile from '../User/UserProfile';

function FriendApp() {

  return (
    <div>
      <UserProfile />
      
      <main className="friends-screen">
        <FriendsList />
      </main>

      <NavigationBar />

      <div id="no-mobile">
        
      </div>
    </div>
  );
}

export default FriendApp;
