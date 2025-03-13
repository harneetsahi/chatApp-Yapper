import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IAuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
