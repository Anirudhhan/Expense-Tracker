import React, { useRef, useState, useEffect } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import AddEntryModal from "../modals/AddEntryModal";
import { Loader, SquarePen, Trash2, AlertCircle, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
    console.log("emoji", editData?.emoji);
    
    // Small delay to ensure state is updated before opening modal
    setTimeout(() => {
      addEntryModalRef.current?.openModal();
    }, 10);
  };

  const displayedTransactions = totalIncomeTransactions.slice(props.start, props.end);
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
  <>
    {isRecentTransactionLoading ? (
      <div className="flex justify-center items-center h-full mt-8">
        <Loader className="animate-spin w-10 h-10 text-base-content" />
      </div>
    ) : (
      <>
        {displayedTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="group relative flex flex-wrap md:flex-nowrap items-center gap-3 mt-4 p-3 rounded-lg hover:bg-base-100/60"
          >
            {/* Transaction Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl rounded-full bg-base-300 flex items-center justify-center flex-shrink-0">
              {transaction.emoji}
            </div>

            {/* Transaction Info */}
            <div className="flex flex-col flex-grow">
              <h1 className="text-sm md:text-base font-medium">{transaction.category}</h1>
              <p className="text-xs md:text-sm text-base-500">
                {new Date(transaction.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center justify-center gap-1 w-auto px-2 rounded-sm h-7 bg-green-200 text-green-600">
                <span className="text-xs md:text-sm font-medium">
                  + ₹ {transaction.amount}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-2 w-full md:w-auto md:mt-0 md:ml-2">
              <div className="flex gap-2 w-full justify-end">
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="p-1.5 rounded-full bg-red-100 text-red-600 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100"
                  aria-label="Delete transaction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenModal(transaction)}
                  className="p-1.5 rounded-full bg-blue-100 text-blue-600 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100"
                  aria-label="Edit transaction"
                >
                  <SquarePen className="w-4 h-4" />
                </button>
                {isEntryDeleting && <Loader className="w-5 h-5 animate-spin" />}
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
          name={editData ? 'Edit Income' : 'Add Income'}
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
  </>
);

}

export default TotalIncome;