import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import useAuth from "./useAuth";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      console.log(res.data);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    console.log("userId", userId);
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    console.log("select", selectedUser._id);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.messages);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuth.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
  },
  updateEditedMessage: async (messageId, newText) => {
    try {
      const res = await axiosInstance.patch(`/messages/${messageId}`, {
        text: newText,
      });
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === messageId ? { ...message, ...res.data } : message
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.messages);
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === messageId
            ? { ...message, text: message.text }
            : message
        ),
      }));
    }
  },
  onDeleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((message) => message._id !== messageId),
      }));
    } catch (error) {
      toast.error(error.response.data.messages);
    }
  },
}));
