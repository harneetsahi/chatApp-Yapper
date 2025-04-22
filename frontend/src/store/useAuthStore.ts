import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "./useChatStore";

const BASE_URL = "http://localhost:3000";

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: any;
}

interface IAuthStore {
  authUser: null | User;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isCheckingAuth: boolean;
  socket: null | Socket;

  checkAuth: () => Promise<void>;
  signup: (user: User) => Promise<void>;
  signin: (user: User) => void;
  signout: () => void;
  updateProfile: (image: any) => void;
  updatePassword: (password: {}) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isUpdatingPassword: false,
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
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

  updateProfile: async (file) => {
    set({ isUpdatingProfile: true });
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axiosInstance.patch("/auth/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Profile update failed");
      console.log(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updatePassword: async (formData) => {
    set({ isUpdatingPassword: true });

    try {
      await axiosInstance.post("/auth/updatePassword", formData);
      toast.success("Password updated successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isUpdatingPassword: false });
    }
  },

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
