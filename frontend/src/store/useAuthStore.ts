import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface IAuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (user: User) => void;
  signin: (user: User) => void;
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
      console.log(res.data);
    } catch (error) {
      console.log("error checking auth status ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      // set({ authUser: res.data });
      console.log(res);
      toast.success("Signed up successfully");
    } catch (error) {
      console.log("error signing up " + error);
      toast.error((error as Error).message);
    }
  },

  signin: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/signin", formData);
      set({ authUser: res.data });
      console.log(res);
      toast.success("Welcome to your account. Yap away!");
    } catch (error) {
      console.log("error signing in", error);
      toast.error((error as Error).message);
    }
  },
}));
