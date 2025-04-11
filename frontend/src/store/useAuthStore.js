import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data});            
        } catch (error) {
            set({authUser: null});   
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Account Loggedin Successfully")            
        } catch (error) {
            toast.error(error.response.data.message);            
        } finally{
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("auth/logout");
            set({authUser: null});
            toast.success("Logged out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);            
        }

    },
}));