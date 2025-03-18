import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IMessage {
  _id?: string;
  senderId?: string;
  receiverId?: string;
  text?: string;
  createdAt?: string;
}

interface IChatStore {
  users: IUser[];
  messages: IMessage[];
  selectedUser: IUser | null;

  getUsers: () => void;
  getMessages: (id: string) => void;
  sendMessage: (messageData: IMessage) => void;
  fetchMessages: () => void;
  closeMessages: () => void;
  setSelectedUser: (selectedUser: IUser | null) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ users: res.data });
    } catch (error) {
      toast.error((error as Error).message);
    }
  },

  getMessages: async (id) => {
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error((error as Error).message);
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser?._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error((error as Error).message);
    }
  },

  fetchMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("message", (message) => {
      if (message.senderId !== selectedUser._id) return;

      set({ messages: [...get().messages, message] });
    });
  },

  closeMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("message");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
