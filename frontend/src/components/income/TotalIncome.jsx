import React, { useRef, useState, useEffect } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Loader, SquarePen, Trash2 } from 'lucide-react';
import AddEntryModal from "../modals/AddEntryModal";

function TotalIncome(props) {
  const { isRecentTransactionLoading, totalIncomeTransactions, isEntryDeleting, deleteEntry } = useExpenseStore();

  const addEntryModalRef = useRef(null);
  const [editData, setEditData] = useState(null);

  const handleOpenModal = (transaction) => {
    // Make a deep copy of the transaction to prevent reference issues
    setEditData({
      _id: transaction._id,
      emoji: transaction.emoji || "",
      category: transaction.category || "",
      amount: transaction.amount || "",
      note: transaction.note || "",
      date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ""
    });
    
    // Small delay to ensure state is updated before opening modal
    setTimeout(() => {
      addEntryModalRef.current?.openModal();
    }, 10);
  };

  const displayedTransactions = totalIncomeTransactions.slice(props.start, props.end);
  const isLastBatch = displayedTransactions.length < 5;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteEntry(id);
    }
  };

  return (
    <div>
      {isRecentTransactionLoading ? (
        <div className="content-center flex justify-center items-center h-full mt-35">
          <Loader className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <>
          {displayedTransactions.map((transaction) => (
            <div key={transaction._id} className="group relative flex items-center gap-4 mt-4 p-3 rounded-lg hover:bg-gray-100/60">
              <div className="w-12 h-12 text-2xl rounded-full bg-gray-300 flex items-center justify-center">
                {transaction.emoji}
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-medium">{transaction.category}</h1>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Trash2 
                  onClick={() => handleDelete(transaction._id)} 
                  className="w-5 h-5 text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-100" 
                />
                <SquarePen 
                  onClick={() => handleOpenModal(transaction)} 
                  className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-100" 
                />
                {isEntryDeleting && transaction._id === deleteId && (
                  <Loader className="w-5 h-5 animate-spin" />
                )}
                <div className="flex items-center justify-center gap-2 w-20 rounded-sm h-7 bg-green-200 text-green-600">
                  <span className="text-sm font-medium">+ ₹ {transaction.amount}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add/Edit Modal */}
          <AddEntryModal
            ref={addEntryModalRef}
            type="income"
            edit={!!editData}
            id={editData?._id}
            name={editData ? "Edit Income" : "Add Income"}
            emoji={editData?.emoji}
            category={editData?.category}
            amount={editData?.amount}
            note={editData?.note}
            date={editData?.date}
          />

          {isLastBatch && displayedTransactions.length > 0 && (
            <div className="text-center py-4 text-gray-500 text-sm italic">
              You have reached the end of the transactions
            </div>
          )}

          {displayedTransactions.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No transactions to display
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TotalIncome;