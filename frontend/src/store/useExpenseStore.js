import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useExpenseStore = create((set, get) => ({
    isRecentTransactionLoading: false,
    dashboardData: null,
    recentTransactions: [],
    totalIncomeTransactions: [],
    totalExpenseTransactions: [],
    isEntryDeleting: false,

    getDashboardData: async () => {
        set({ isRecentTransactionLoading: true });
        try {
            const { loggedIn } = useAuthStore.getState();
            if (!loggedIn) return;
            const res = await axiosInstance.get("/dashboard");
            set({ dashboardData: res.data, 
                recentTransactions: res.data.recentTransactions,
            totalIncomeTransactions: res.data.income.transactions,
            totalExpenseTransactions: res.data.expense.transactions },
            console.log("Total Income tt", res.data.expense.transactions)
        );
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
            set((state) => ({ totalExpenseTransactions: [res.data.expense, ...state.totalExpenseTransactions] }));
            set((state) => ({ totalIncomeTransactions: [res.data.expense, ...state.totalIncomeTransactions] }));

            get().getDashboardData();
        } catch (error) {
            toast.error(error.response.data.message);
        }

    },

    editEntry: async (data, id) => {
        try {
            console.log("id", id);
            // console.log("transaction._id", transaction._id);
            console.log("data._id", data._id);
            const res = await axiosInstance.put(`/expense/edit/${id}`, data);
            toast.success(res.data.message);
            set((state) => ({
                recentTransactions: state.recentTransactions.map(transaction => {
                  console.log("transaction._id", transaction._id); // Log the transaction ID
                  return transaction._id === data._id ? res.data.expense : transaction;
                })
              }));
              
            // set((state) => ({ recentTransactions: state.recentTransactions.map(transaction => transaction._id === data._id ? res.data.expense : transaction) }));
            set((state) => ({
                totalExpenseTransactions: state.totalExpenseTransactions.map(transaction =>
                  transaction._id === data._id ? res.data.expense : transaction
                ),
                totalIncomeTransactions: state.totalIncomeTransactions.map(transaction =>
                  transaction._id === data._id ? res.data.expense : transaction
                )
              }));

            get().getDashboardData();
              
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
            set((state) => ({ totalExpenseTransactions: state.totalExpenseTransactions.filter(transaction => transaction._id !== id) }));
            toast.success(res.data.message);

            get().getDashboardData();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isEntryDeleting: false });
        }
    },

}));