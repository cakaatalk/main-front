import React from 'react';
import Message from './Message'; 

function ChatScreen() {
  return (
    <main className="main-screen main-chat">
      <Message author="Nicolas" content="Hi!" time="21:27" />  {/*API*/}
      <Message content="Hi nice to meet you!" time="21:27" isOwnMessage={true} />  {/*API*/}
      <Message author="Nicolas" content="Hi!" time="21:27" />  {/*API*/}
      <Message content="Hi nice to meet you!" time="21:27" isOwnMessage={true} />  {/*API*/}
      {/*squash test1*/}
      {/*squash test2*/}
      {/*squash test3*/}
    </main>
  );
}

export default ChatScreen;
