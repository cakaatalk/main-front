import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, } from '@fortawesome/free-solid-svg-icons';
import useTimeAndBattery from '../Common/UseTimeAndBattery';
import StatusBar from '../Common/StatusBar';
import NavigationBar from '../Common/NavigationBar';
import FriendsHeader from './FriendsHeader';
import FriendsList from './FriendsList';
import UserProfile from '../User/UserProfile';
import ChannelSection from '../Common/ChannelSection';
import '../css/components/styles.css';

function FriendApp() {
  const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();

  return (
    <div>
      <StatusBar currentTime={currentTime} batteryLevel={batteryLevel} getBatteryIcon={getBatteryIcon} />
      <UserProfile />
      <FriendsHeader />
      
      <main className="friends-screen">
        <FriendsList />
        <ChannelSection />
      </main>

      <NavigationBar />

      <div id="splash-screen">
        <FontAwesomeIcon icon={faComment} />
      </div>

      <div id="no-mobile">
        
      </div>
    </div>
  );
}

export default FriendApp;
