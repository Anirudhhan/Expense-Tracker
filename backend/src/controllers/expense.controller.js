    import Expense from "../models/expense.model.js";

    export const addExpense = async (req, res) => {
        const { emoji, category, amount, note, date, type } = req.body;
        try {
            if (!amount) return res.status(401).json({message: "Amount is required"});
            if (!type) return res.status(401).json({message: "Expense type is required"});
            if (!date) return res.status(401).json({message: "Date is required"});

            const newExpense = new Expense({emoji, category, amount, note, date, type, user: req.user._id});
            await newExpense.save();
            res.status(201).json({ message: "Expense added successfully", expense: newExpense });                
        } catch (error) {
            console.log("Error in addExpense controller: ", error.message);
            res.status(500).json({message: "Internal Server Error"});          
        }

    };