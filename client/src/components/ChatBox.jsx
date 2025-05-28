import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'

import MessageInput from './MessageInput';
import { formatTime } from '../lib/dateFormat';
import useAuth from '../store/useAuth';
import { ChevronDown, CrossIcon } from 'lucide-react';
import MessageSkeleton from './MessageSkeleton';
import { useNavigate } from 'react-router-dom';

const ChatBox = () => {

  const { authUser } = useAuth();
  const { messages, getMessages, isMessagesLoading, selectedUser, setSelectedUser, subscribeToMessages, unsubscribeFromMessages, updateEditedMessage, onDeleteMessage } = useChatStore();
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);  // message object being edited
  const [editText, setEditText] = useState("");               // new text input


  const onEdit = (message) => {
    setEditingMessage(message);
    setEditText(message.text || "");
    setOpenMenuId(null);

  };

  const editInputRef = useRef(null);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingMessage]);


  const handleSaveEdit = async () => {
    if (!editingMessage) return;


    await updateEditedMessage(editingMessage._id, editText.trim());
    setEditingMessage(null);
  };



  const onDelete = async (message) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await onDeleteMessage(message._id);
    }
    return;
  };




  const toggleMenu = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };






  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id)

    subscribeToMessages()

    return () => unsubscribeFromMessages()
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageRef.current && messages) {

      messageRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [messages, selectedUser])


  if (!authUser || isMessagesLoading || !selectedUser) {
    return <MessageSkeleton />

  }
  const roter = () => {
    unsubscribeFromMessages()
    navigate(`/${selectedUser._id}`)
  }

  return (

    <>
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center border-gray-600 bg-gray-800">
        {/* <Link to={selectedUser._id}> */}
        <div className="flex items-center cursor-pointer" onClick={() => roter()}>
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium mr-3 overflow-hidden">
            <img src={selectedUser.profilePic || "/avatar.svg"} alt="" className='w-full h-full object-cover' />
          </div>
          <h2 className="font-semibold text-white">{selectedUser.fullName}</h2>
        </div>
        {/* </Link> */}
        <button className='bg-gray-700 rounded-full p-2 cursor-pointer' onClick={() => setSelectedUser(null)}>
          <CrossIcon className='rotate-45' />
        </button>
      </div>
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-sm max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">New Conversation</h2>
            <p className="text-sm text-gray-600">
              Start chatting by selecting a user or creating a new message!
            </p>
          </div>
        </div>
      )}



      <div className="flex-1 overflow-y-auto  message-scroll p-4 space-y-5">
        {messages.map((message) => {
          // Store the sender ID comparison in a variable
          const senderIdStr = message.senderId?.toString() || "";
          const authUserIdStr = authUser?._id?.toString() || "";
          const isOwnMessage = authUser && authUserIdStr && senderIdStr === authUserIdStr;
          const SIX_HOURS = 6 * 60 * 60 * 1000;
          const messageAge = new Date() - new Date(message.createdAt);
          const canEdit = messageAge <= SIX_HOURS;


          return (
            <div
              key={message._id}
              className={`flex flex-col md:flex-row ${isOwnMessage ? "justify-end items-end flex-col-reverse" : "justify-start"}  items-start`}
              ref={messageRef}
            >
              {!isOwnMessage && (
                <div className="mr-2">
                  <div className="w-8 md:w-12 aspect-square overflow-hidden rounded-full border">
                    <img
                      src={selectedUser?.profilePic || "/avatar.svg"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div
                className={`relative max-w-xs sm:max-w-md space-y-1 flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
              >
                {/* Down Arrow Button */}
                {isOwnMessage && (
                  <button
                    onClick={() => toggleMenu(message._id)}
                    className="absolute top-0 right-0 p-1 text-gray-400 hover:text-white"
                    aria-label="Options"
                    style={{ transform: 'translate(50%, -50%)' }} // position outside top-right corner
                  >
                    <ChevronDown size={16} />
                  </button>
                )}

                <div className={`p-2 rounded-lg ${isOwnMessage ? 'bg-indigo-600' : 'bg-gray-900'} text-sm`}>
                  {message.image && (
                    <img src={message.image} alt="Attachment" className="max-w-[200px] rounded-md mb-2" />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                <time className="text-xs opacity-50">{formatTime(message.createdAt)}</time>

                {/* Dropdown Menu */}
                {openMenuId === message._id && (
                  <div className="absolute top-6 right-0 bg-gray-800 rounded-md shadow-lg z-10 w-28">
                    <ul className="text-sm text-white">
                      {canEdit && (
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-indigo-600"
                          onClick={() => {
                            setOpenMenuId(false);
                            onEdit(message);
                          }}
                        >
                          Edit
                        </li>
                      )}
                      <li
                        className="cursor-pointer px-3 py-2 hover:bg-red-600"
                        onClick={() => {
                          setOpenMenuId(false);
                          onDelete(message);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {isOwnMessage && (
                <div className="ml-2">
                  <div className="w-8 md:w-12 aspect-square rounded-full border overflow-hidden">
                    <img
                      src={authUser?.profilePic || "/avatar.svg"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>





      <MessageInput />
     {editingMessage && (
  <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-md shadow-md w-full max-w-md z-50">
    <input
      ref={editInputRef}
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      className="w-full p-2 rounded-md border bg-gray-900 text-white"
      placeholder="Edit message"
    />
    <div className="flex justify-end space-x-2 mt-2">
      <button
        className="px-4 py-1 bg-indigo-600 text-white rounded-md"
        onClick={handleSaveEdit}
      >
        Save
      </button>
      <button
        className="px-4 py-1 bg-gray-600 text-white rounded-md"
        onClick={() => setEditingMessage(null)}
      >
        Cancel
      </button>
    </div>
  </div>
)}


    </>
  )
}

export default ChatBox