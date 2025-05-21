
import { useChatStore } from '../store/useChatStore.js';

import Sidebar from '../components/Sidebar.jsx';
import ChatBox from '../components/ChatBox.jsx';
import NoChatBox from '../components/NoChatBox.jsx';

const HomePage = () => {
  const { selectedUser } = useChatStore();



  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      {/* Sidebar */}
     <Sidebar/>

      {/* Chat Area / Logo */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
         <ChatBox />
        ) : (
          <NoChatBox/>
        )}
      </div>
    </div>
  );
};

export default HomePage;