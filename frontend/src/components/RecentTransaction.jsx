import React from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import {LoaderPinwheel} from 'lucide-react';


function RecentTransaction() {

    const { isRecentTransactionLoading } = useExpenseStore();

  return (
    <div>
        <h1>Recent Transactions</h1>
        {!isRecentTransactionLoading ? (
            <div className="content-center flex justify-center items-center h-full">
            <LoaderPinwheel className='animate-spin w-20 h-20' />
            </div>) : ""
        }
    </div>
  )
}

export default RecentTransaction