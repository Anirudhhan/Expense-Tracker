import React from 'react';

function SeeAllModal(props) {
  // Function to close modal when clicking outside
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal(false);
    }
  };

  return (
    <div>
      <div
        className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'
        onClick={handleBackgroundClick}
      >
        <div
          className="bg-base-100 rounded-lg shadow-lg md:max-w-2xl max-w-[350px] w-full h-9/12 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <div className="bg-base-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-medium">{props.title}</h2>
            <button
              onClick={() => props.closeModal(false)}
              className="text-base-500 hover:text-base-700 text-xl cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Scrollable content area with its own padding */}
          <div className="overflow-y-auto flex-1 px-6 ">
            {props.transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="group relative flex items-center gap-4 mt-4 p-3 rounded-lg hover:bg-base-100/60"
              >
                <div className="w-12 h-12 text-2xl rounded-full bg-base-400 flex items-center justify-center">
                  {transaction.emoji}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium">{transaction.category}</h1>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {transaction.type === 'income' ? (
                  <div className="flex items-center justify-center gap-2 ml-auto w-20 rounded-sm h-7 bg-green-200 text-green-600">
                    <span className="text-sm font-medium">+ ₹ {transaction.amount}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 ml-auto w-20 rounded-sm h-7 bg-red-200 text-red-600">
                    <span className="text-sm font-medium">- ₹ {transaction.amount}</span>
                  </div>
                )}
              </div>
            ))}
            <div className="text-center pt-4 py-5 text-base-500 text-sm italic">
              You have reached the end of the transactions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeAllModal;
