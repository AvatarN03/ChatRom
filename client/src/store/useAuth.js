import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";
import { io } from "socket.io-client";

const useAuth = create((set, get) => ({
  authUser: null,
  isChecking: true,
  isSigningUp: false,
  isUpdatingProfile: false,
  isLoggingIn: false,
  onlineUsers: [],
  socket: null,
  checkUser: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(`error`, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signup successful");
      get().connectSocket();
    } catch (error) {
      toast.error("Error in Signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      const con = window.confirm("Are you sure to logout?");
      if (!con) return;

      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      const { setSelectedUser } = useChatStore.getState();
      setSelectedUser(null);
    } catch (error) {
      toast.error("Error in Logging-Out, Try Again later.");
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);
      set({ authUser: res.data });
      toast.success("Login successful");

      get().connectSocket();
    } catch (error) {
      toast.error("Login Failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/profilepic", data);
      set({ authUser: res.data });
      toast.success("Updated Profile Image");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    console.log(authUser);
    if (!authUser || get().socket?.connected) return;
    const socket = io(import.meta.env.VITE_SOCKET_URI, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  getProfileDetails: async (userId) => {
    try {
      const res = await axiosInstance.get(`/auth/${userId}`);
      console.log(res.data);
      return res.data;
      
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching profile details");
      
    }
  },
}));

export default useAuth;
