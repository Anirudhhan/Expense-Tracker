import React, { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import {Loader, MoveRight, Receipt} from 'lucide-react';
import SeeAllModal from '../modals/SeeAllModal';


function RecentTransaction() {
    const { isRecentTransactionLoading, recentTransactions } = useExpenseStore();
    const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (
    
    <div className='px-4'>
        <div className="flex justify-between items-center">
          <h1 className='font-medium text-xl'>Recent Transactions</h1>
          <div className="relative cursor-pointer" onClick={() => {setIsModalOpen(!isModalOpen)}}>
            <button className="cursor-pointer bg-base-100 px-3 pr-5 py-1 rounded-md hover:bg-base-300 transition duration-200 text-sm">
              See All
            </button>
              <span className="absolute right-1 mt-[3px] items-center justify-center "><MoveRight className='w-3 h-6' /></span>
          </div>
        </div>
        {isRecentTransactionLoading ? (
        <div className="content-center flex justify-center items-center h-full mt-35">
          <Loader className='animate-spin w-10 h-10 ' />
        </div>
      ) : recentTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:mt-22">
          <Receipt className='w-16 h-16 text-gray-400 mb-4' />
          <h3 className='text-lg font-medium text-gray-600 mb-2'>No Transactions Yet</h3>
          <p className='text-sm text-gray-500 text-center max-w-xs'>
            Start tracking your expenses and income to see your recent transactions here.
          </p>
        </div>
      ) : (
        recentTransactions.slice(0, 5).map((transaction) => (
          <div key={transaction._id} className="group relative flex items-center gap-4 mt-4 p-3 rounded-lg hover:bg-base-100/60">
            <div className='w-12 h-12 text-2xl rounded-full bg-base-400 flex items-center justify-center'>
              {transaction.emoji}
            </div>
            <div className="flex flex-col">
              <h1 className='text-base font-medium'>{transaction.category}</h1>
              <p className='text-sm text-gray-500'>{new Date(transaction.date).toLocaleDateString('en-IN', {day: 'numeric',month: 'long', year: 'numeric'})}</p>
            </div>
            {
              transaction.type === "income" ? (
                <div className="flex items-center justify-center gap-2 ml-auto w-20 rounded-sm h-7 bg-green-200 text-green-600">
                  <span className='text-sm font-medium'>+ ₹ {transaction.amount}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 ml-auto w-20 rounded-sm h-7 bg-red-200 text-red-600">
                  <span className='text-sm font-medium'>- ₹ {transaction.amount}</span>
                </div>
              )
            }

          </div>
        ))
      )}
      {isModalOpen && (
        <SeeAllModal 
        title="Recent Transactions"
        closeModal={setIsModalOpen}
        transactions={recentTransactions}
        />

      )}

    </div>
  )
}

export default RecentTransaction