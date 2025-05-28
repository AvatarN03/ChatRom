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
    const socket = useAuth.getState().socket;
    if (!selectedUser || !socket) return;

    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });

    socket.on("messageEdited", ({ messageId, newText }) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === messageId ? { ...message, text: newText } : message
        ),
      }));
    });

   socket.on("messageDeleted", (messageId) => {
  const existed = get().messages.some((m) => m._id === messageId);

  if (!existed) {
    get().getMessages(get().selectedUser?._id);
  } else {
    set((state) => ({
      messages: state.messages.filter((message) => message._id !== messageId),
    }));
  }
});

  },
  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");
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

      const socket = useAuth.getState().socket;
      socket.emit("messageDeleted", messageId); // Emit event to notify others

      set((state) => ({
        messages: state.messages.filter((message) => message._id !== messageId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.messages || error.message);
    }
  },
}));
