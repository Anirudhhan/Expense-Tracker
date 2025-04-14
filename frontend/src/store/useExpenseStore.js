import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExpenseStore = create((set) => ({
    isRecentTransactionLoading: false,
    dashboardData: null,
    recentTransactions: [],
    totalIncomeTransactions: [],

    getDashboardData: async () => {
        set({ isRecentTransactionLoading: true });
        try {
            const res = await axiosInstance.get("/dashboard");
            set({ dashboardData: res.data, 
                recentTransactions: res.data.recentTransactions,
            totalIncomeTransactions: res.data.income.transactions });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isRecentTransactionLoading: false });
        }
    },

    addEntry: async (data) => {
        try {
            const res = await axiosInstance.post("/expense/add-entry", data);
            toast.success(res.data.message);
            set((state) => ({ recentTransactions: [res.data.expense, ...state.recentTransactions] }));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }


}));