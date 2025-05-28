import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import useAuth  from "../store/useAuth";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();


  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers, onlineUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-16 md:w-44 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-gray-600">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 flex flex-col lg:flex-row items-center gap-2">
          <label className="cursor-pointer flex flex-col md:flex-row justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm hidden md:block">Show online only</span>
            <span className="text-sm block md:hidden">Online</span>
          </label>
          <span className="text-xs text-indigo-300 font-bold hidden md:block">({onlineUsers.length - 1} online)</span>
        </div>
      </div>
     

      <div className="overflow-y-auto w-full py-3 message-scroll">
        {
            filteredUsers.map((user)=>(
              <button
              title={user.fullName}
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-[95%] mx-auto rounded-md p-3 flex items-center justify-center md:justify-start my-2 gap-3
                text-white
                hover:bg-gray-800 transition-colors
                // ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <img src={user.profilePic || "/avatar.svg"} alt="" className="w-8 md:w-12 aspect-square object-cover rounded-full border-2" />
              <p className="hidden md:block line-clamp-1" >{user.fullName}</p>

              </button>
            ))
        }
       
      </div>
    </aside>
  );
};
export default Sidebar;