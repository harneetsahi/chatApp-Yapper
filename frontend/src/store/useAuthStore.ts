import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = "http://localhost:3000";

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface IAuthStore {
  authUser: string | null | User;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  socket: null | Socket;

  checkAuth: () => Promise<void>;
  signup: (user: User) => Promise<void>;
  signin: (user: User) => void;
  signout: () => void;
  openSettings: () => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error("Account already exists");
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (formData) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/signin", formData);
      set({ authUser: res.data });
      toast.success("Welcome to your account. Yap away!");
      get().connectSocket();
    } catch (error) {
      console.log("error signing in", error);
      toast.error("Incorrect credentials");
    } finally {
      set({ isSigningIn: false });
    }
  },

  signout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      get().disconnectSocket();
      useChatStore.getState().resetChat();
      return Promise.resolve();
    } catch (error) {
      toast.error((error as Error).message);
      return Promise.reject(error);
    }
  },

  openSettings: () => {},

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, { query: { userId: (authUser as User)._id } });
    socket.connect();

    set({ socket: socket });
  },

  disconnectSocket: async () => {
    const socket = get().socket?.connected;
    if (socket) get().socket?.disconnect();
    set({ socket: null });
  },
}));
