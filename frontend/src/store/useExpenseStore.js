import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExpenseStore = create((set) => ({
    isRecentTransactionLoading: false,
    dashboardData: null,
    recentTransactions: [],
    totalIncomeTransactions: [],
    isEntryDeleting: false,

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
            set((state) => ({ totalIncomeTransactions: [res.data.expense, ...state.totalIncomeTransactions] }));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    },

    editEntry: async (data, id) => {
        try {
            const res = await axiosInstance.put(`/expense/edit/${id}`, data);
            toast.success(res.data.message);
            set((state) => ({ recentTransactions: state.recentTransactions.map(transaction => transaction._id === data._id ? res.data.expense : transaction) }));
            set((state) => ({ totalIncomeTransactions: state.totalIncomeTransactions.map(transaction => transaction._id === data._id ? res.data.expense : transaction) }));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    deleteEntry: async (id) => {
        set({ isEntryDeleting: true });
        try {
            const res = await axiosInstance.delete(`/expense/delete/${id}`);
            set((state) => ({ recentTransactions: state.recentTransactions.filter(transaction => transaction._id !== id) }));
            set((state) => ({ totalIncomeTransactions: state.totalIncomeTransactions.filter(transaction => transaction._id !== id) }));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isEntryDeleting: false });
        }
    },

}));