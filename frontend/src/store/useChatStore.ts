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
  avatar?: string;
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

  getUsers: () => Promise<void>;
  getMessages: (id: string) => Promise<void>;
  sendMessage: (messageData: IMessage) => Promise<void>;
  fetchMessages: () => void;
  closeMessages: () => void;
  setSelectedUser: (selectedUser: IUser | null) => void;
  resetChat: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,

  getUsers: async () => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) return;

    try {
      const res = await axiosInstance.get("/message/chats");
      set({ users: res.data });
    } catch (error) {
      console.log((error as any).response.data);
    }
  },

  getMessages: async (id) => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) return;

    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      // toast.error((error as Error).message);
      console.log((error as any).response.data);
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
    const authUser = useAuthStore.getState().authUser;

    if (!authUser || !selectedUser) return;

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

  resetChat: () => {
    set({
      users: [],
      messages: [],
      selectedUser: null,
    });
    get().closeMessages();
  },
}));
