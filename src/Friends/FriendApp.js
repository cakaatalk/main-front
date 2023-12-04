import NavigationBar from '../Common/NavigationBar';
import FriendsList from './FriendsList';
import UserProfile from '../User/UserProfile';

function FriendApp() {

  return (
    <div>
      <h1 className='friend-text'>
        친구
      </h1>
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
