import {useState} from 'react'
import TotalExpense from '../components/expense/TotalExpense'
import ExpenseOverview from '../components/expense/ExpenseOverview'
import { MoveRight } from 'lucide-react'
import { useExpenseStore } from '../store/useExpenseStore';

function ExpensePage() {
      const [ isModalOpen, setIsModalOpen ] = useState(false);
      const { totalExpenseTransactions } = useExpenseStore();
  
  return (
    <div className='bg-black/5 w-full min-h-screen p-4 md:p-10 mt-12 sm:mt-0'>
    <div className='bg-base-100 rounded-md p-4 shadow-sm h-auto md:h-109'>
      <ExpenseOverview/>
    </div>

    <div className="bg-base-100 rounded-xl p-4 shadow-sm mt-9 px-10 pt-10">
        {/* Navigation-like header */}
        <div className="flex justify-between items-center pb-3 mb-4">
          <h1 className="font-medium text-xl">Expense</h1>
          <div className="relative">
            <button onClick={()=>setIsModalOpen(!isModalOpen)} className="bg-base-100 px-3 pr-5 py-1 rounded-md hover:bg-base-300 transition duration-200 text-sm">
              See All
            </button>
            <span className="absolute right-1 mt-[3px] items-center justify-center">
              <MoveRight className="w-3 h-6" />
            </span>
          </div>
        </div>

        {/* Two columns of TotalIncome components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className=" rounded-lg ">
            <TotalExpense start="0" end="5" />
          </div>
          <div className="rounded-lg">
            <TotalExpense start="5" end="10" />
          </div>
        </div>
      </div>
      {/* {isModalOpen && (
        <SeeAllModal 
        title="Expenses Transactions"
        closeModal={setIsModalOpen}
        transactions={totalExpenseTransactions}
        />

      )} */}
  </div>
  )
}

export default ExpensePage