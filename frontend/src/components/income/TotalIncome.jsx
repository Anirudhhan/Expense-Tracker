import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import {Loader, MoveRight} from 'lucide-react';


function TotalIncome(props) {
    const { isRecentTransactionLoading, totalIncomeTransactions } = useExpenseStore();

  return (
    <div className='px-4'>
        {isRecentTransactionLoading ? (
        <div className="content-center flex justify-center items-center h-full mt-35">
          <Loader className='animate-spin w-10 h-10 ' />
        </div>
      ) : (
        totalIncomeTransactions.slice(props.start, props.end).map((transaction) => (
          <div key={transaction._id} className="group relative flex items-center gap-4 mt-4 p-3 rounded-lg hover:bg-gray-100/60">
            <div className='w-12 h-12 text-2xl rounded-full bg-gray-300 flex items-center justify-center'>
              {transaction.emoji}
            </div>
            <div className="flex flex-col">
              <h1 className='text-base font-medium'>{transaction.category}</h1>
              <p className='text-sm text-gray-500'>{new Date(transaction.date).toLocaleDateString('en-IN', {day: 'numeric',month: 'long', year: 'numeric'})}</p>
            </div>

            <div className="flex items-center justify-center gap-2 ml-auto w-20 rounded-sm h-7 bg-green-200 text-green-600">
                <span className='text-sm font-medium'>+ ₹ {transaction.amount}</span>    
            </div>
          </div>
        ))
      )}

    </div>
  )
}

export default TotalIncome;