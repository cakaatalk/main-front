import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import FriendApp from './Friends/FriendApp'; 
import LoginPage from './Login/LoginApp'; 
import Chats from './Chat/ChatsApp';
import More from './More/MoreApp';
import ChatApp from './Chat-Room/ChatApp';
import { AuthProvider } from './AuthContext';

import "./css/components/scrollBar.css"
import './css/components/styles.css'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <LoginPage />
          </div>
        } />
        <Route path="/friends" element={<FriendApp />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/more" element={<More />} />
        <Route path="/chat/:chatId" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
