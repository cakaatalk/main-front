import UserList from './UserList'; 
import NavigationBar from '../Common/NavigationBar';

function MoreApp() {
  return (
    <div>
      <h1 className='friend-add'>
        친구 추가
      </h1>
      <NavigationBar />
      <main className="main-screen more-screen">
        <UserList /> 
      </main>
      <div id="no-mobile"></div>
    </div>
  );
}

export default MoreApp;