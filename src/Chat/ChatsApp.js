import NavigationBar from '../Common/NavigationBar';
import ChatScreen from './ChatScreen';


function ChatsApp(){
  
    return (
      <div>
          <ChatScreen />
    
          <NavigationBar />
    
          <div id="no-mobile">

          </div>
        </div>
      );
}

export default ChatsApp;