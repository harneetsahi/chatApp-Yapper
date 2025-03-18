import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (id: string) => void;
  sendMessage: (messageData: IMessage) => void;
  setSelectedUser: (selectedUser: IUser | null) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ users: res.data });
    } catch (error) {
      toast.error((error as Error).message);
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser?._id}`,
        messageData
      );
      console.log(messageData);
      console.log(res.data.message);
      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error((error as Error).message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
