import Expense from "../models/expense.model.js";

export const addEntry = async (req, res) => {
    const { emoji, category, amount, note, date, type } = req.body;
    try {
        if (!amount) return res.status(400).json({message: "Amount is required"});
        if (!type) return res.status(400).json({message: "Expense type is required"});
        if (!date) return res.status(400).json({message: "Date is required"});

        const newExpense = new Expense({emoji, category, amount, note, date, type, user: req.user._id});
        await newExpense.save();
        res.status(201).json({ message: "Entry added successfully", expense: newExpense });                
    } catch (error) {
        console.log("Error in addExpense controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});          
    }

};

export const fetchAllEntries = async (req, res) => {
    const { type } = req.params
    try {
        const allExpense = await Expense.find({
            user: req.user._id,
            type
        });

        if (allExpense.length === 0) return res.status(200).json({message: "No entries till now"});

        res.status(200).json({allExpense});        
    } catch (error) {
        console.log("Error in fetchAllEntries controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});        
    }
};

export const deleteEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Expense.findByIdAndDelete(id);

        if (!entry) return res.status(404).json({message: "No such entry"});

        res.status(200).json({message: "Entry deleted Successfully"});
    } catch (error) {
        console.log("Error in deleteEntry controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});           
    }
};

export const editEntry = async (req, res) => {
    const { id } = req.params;
    const { category, emoji, amount, date, note, type } = req.body;

    try {
        const existingEntry = await Expense.findById(id);
        if (!existingEntry) return res.status(404).json({ message: "No such entry found" });

        const updatedFields = {
            category: category || existingEntry.category,
            emoji: emoji || existingEntry.emoji,
            amount: amount || existingEntry.amount,
            date: date || existingEntry.date,
            note: note || existingEntry.note,
            type: type || existingEntry.type
        };

        const editedEntry = await Expense.findByIdAndUpdate(id, updatedFields, { new: true });

        res.status(200).json({ editedEntry, message: "Entry edited successfully" });        
    } catch (error) {
        console.log("Error in editEntry controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};