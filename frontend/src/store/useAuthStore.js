import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    isCheckingAuth: false,
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data});
        } catch (error) {
            set({authUser: null});   
        } finally {
            set({isCheckingAuth: false});
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

    signUp: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account Created Successfully")            
        } catch (error) {
            toast.error(error.response.data.message);            
        } finally{
            set({isSigningUp: false});
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            // Make sure we preserve existing user data if the response doesn't include everything
            set((state) => ({
                authUser: { ...state.authUser, ...res.data }
            }));
            toast.success("Profile Updated Successfully");
            window.location.reload();
            
        } catch (error) {
            toast.error(error.response.data.message);            
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}));