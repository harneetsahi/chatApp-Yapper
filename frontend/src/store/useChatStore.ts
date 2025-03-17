import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface IChatStore {
  users: string[];
  messages: string[];
  selectedUser: null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (id: string) => void;
}

export const useChatStore = create<IChatStore>((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ users: res.data });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      set({ isUsersLoading: false });
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
}));
