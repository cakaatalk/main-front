import StatusBar from '../Common/StatusBar';
import NavigationBar from '../Common/NavigationBar';
import ChatScreen from './ChatScreen';
import useTimeAndBattery from '../Common/UseTimeAndBattery';

function ChatsApp(){
    const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();

    return (
      <div>
        <StatusBar currentTime={currentTime} batteryLevel={batteryLevel} getBatteryIcon={getBatteryIcon} />
  
          <ChatScreen />
    
          <NavigationBar />
    
          <div id="no-mobile">

          </div>
        </div>
      );
}

export default ChatsApp;