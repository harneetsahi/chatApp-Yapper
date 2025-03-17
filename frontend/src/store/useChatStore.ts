import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface IChatStore {
  users: User[];
  messages: string[];
  selectedUser: User | null;
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (id: string) => void;
  setSelectedUser: ({}) => void;
}

export const useChatStore = create<IChatStore>((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ users: res.data });
      console.log(res);
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

  // sendMessage: async (id, text) => {
  //   try {
  //     const res = await axiosInstance.post(`/message/send/${id}`, text);
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //   }
  // },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
