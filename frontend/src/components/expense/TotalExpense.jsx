import React, { useRef, useState, useEffect } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import AddEntryModal from "../modals/AddEntryModal";
import { Loader, SquarePen, Trash2, AlertCircle, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

function TotalIncome(props) {
  const { isRecentTransactionLoading, totalExpenseTransactions, isEntryDeleting, deleteEntry } = useExpenseStore();

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
    console.log("emoji", editData?.emoji);
    
    // Small delay to ensure state is updated before opening modal
    setTimeout(() => {
      addEntryModalRef.current?.openModal();
    }, 10);
  };

  const displayedTransactions = totalExpenseTransactions.slice(props.start, props.end);
  const isLastBatch = displayedTransactions.length < 5;

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg border border-gray-100 max-w-2xl animate-in fade-in slide-in-from-top-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-red-50 p-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="font-semibold text-gray-800">Confirm Deletion</div>
          </div>
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="text-gray-600 pl-10">
          Are you sure you want to delete this entry? 
        </div>
        
        <div className="flex justify-end gap-3 mt-1">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => {
              toast.dismiss(t.id);
              deleteEntry(id).then(() => {
                toast.success('Entry deleted successfully', {
                  duration: 3000,
                  position: 'bottom-right',
                  className: 'bg-white',
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#ECFDF5',
                  },
                });
              });
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 20000,
      position: 'top-center',
      style: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        padding: 0,
      },
    });
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
            <div key={transaction._id} className="group relative flex items-center gap-4 mt-4 p-3 rounded-lg hover:bg-base-100/60">
              <div className="w-12 h-12 text-2xl rounded-full bg-base-300 flex items-center justify-center">
                {transaction.emoji}
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-medium">{transaction.category}</h1>
                <p className="text-sm text-base-500">
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
                {isEntryDeleting && (
                  <Loader className="w-5 h-5 animate-spin" />
                )}
                <div className="flex items-center justify-center gap-2 w-20 rounded-sm h-7 bg-red-300 text-red-700">
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
            <div className="text-center py-4 text-base-500 text-sm italic">
              You have reached the end of the transactions
            </div>
          )}

          {displayedTransactions.length === 0 && (
            <div className="text-center py-4 text-base-500">
              No transactions to display
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TotalIncome;