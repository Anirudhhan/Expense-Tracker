import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExpenseStore = create((set) => ({
    isRecentTransactionLoading: false,
    dashboardData: null,
    recentTransactions: [],

    getDashboardData: async () => {
        set({ isRecentTransactionLoading: true });
        try {
            const res = await axiosInstance.get("/dashboard");
            set({ dashboardData: res.data, recentTransactions: res.data.recentTransactions });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isRecentTransactionLoading: false });
        }
    }
}));