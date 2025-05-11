import Expense from "../models/expense.model.js";

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const totalIncomeTransactions = await Expense.find({ user: userId, type: "income" }).sort({ date: -1 });
        const totalExpensesTransactions = await Expense.find({ user: userId, type: "expense" }).sort({ date: -1 });
        const recentTransactions = await Expense.find({ user: userId }).sort({ date: -1 }).limit(10);
    
        const totalIncome = totalIncomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpenses = totalExpensesTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const last30DaysIncomeTransaction = await Expense.find({
        user: userId,
        type: "income",
        date: { $gte: thirtyDaysAgo }
        }).sort({ date: -1 });

        const last30DaysExpenseTransaction = await Expense.find({
        user: userId,
        type: "expense",
        date: { $gte: thirtyDaysAgo }
        }).sort({ date: -1 });

        const last30DaysIncome = last30DaysIncomeTransaction.reduce((acc, curr) => acc + curr.amount, 0);
        const last30DaysExpenses = last30DaysExpenseTransaction.reduce((acc, curr) => acc + curr.amount, 0);

        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);


        const last60DaysIncomeTransaction = await Expense.find({
            user: userId,
            type: "income",
            date: { $gte: sixtyDaysAgo }
            }).sort({ date: -1 });
    
        const last60DaysExpenseTransaction = await Expense.find({
            user: userId,
            type: "expense",
            date: { $gte: sixtyDaysAgo }
            }).sort({ date: -1 });
    
        const last60DaysIncome = last60DaysIncomeTransaction.reduce((acc, curr) => acc + curr.amount, 0);
        const last60DaysExpenses = last60DaysExpenseTransaction.reduce((acc, curr) => acc + curr.amount, 0);

        res.json({
            totalBalance: (totalIncome || 0) - (totalExpenses || 0),
            income: {
                total: totalIncome || 0,
                transactions: totalIncomeTransactions
            },
            expense: {
                total: totalExpenses || 0,
                transactions: totalExpensesTransactions
            },
            last30DaysIncome: {
                total: last30DaysIncome,
                transactions: last30DaysIncomeTransaction
            },
            last30DaysExpense: {
                total: last30DaysExpenses,
                transactions: last30DaysExpenseTransaction
            },
            last60DaysIncome: {
                total: last60DaysIncome,
                transactions: last60DaysIncomeTransaction
            },
            last60DaysExpense: {
                total: last60DaysExpenses,
                transactions: last60DaysExpenseTransaction
            },
            recentTransactions
        });         
        
    } catch (error) {
        console.log("Error in dashboard controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });         
    }
}