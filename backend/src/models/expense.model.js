import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    emoji: {
        type: String,
        default: "🤷‍♂️"
    },
    category: {
        type: String,
        default: "miscellaneous"
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;