import React, { useState } from "react";
import IncomeOverview from "../components/income/IncomeOverview";
import TotalIncome from "../components/income/TotalIncome";
import { MoveRight } from "lucide-react";
import { useExpenseStore } from "../store/useExpenseStore";
import SeeAllModal from "../components/modals/SeeAllModal";

function IncomePage() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const { totalExpenseTransactions } = useExpenseStore();

  return (
    <div className="bg-black/5 w-full min-h-screen p-4 md:p-10 mt-12 sm:mt-0">
      <div className="bg-base-100 rounded-md p-4 shadow-sm h-auto md:h-109">
        <IncomeOverview />
      </div>

      <div className="bg-base-100 rounded-xl p-4 shadow-sm mt-9 px-10 pt-10">
        {/* Navigation-like header */}
        <div className="flex justify-between items-center pb-3 mb-4">
          <h1 className="font-medium text-xl">Incomes</h1>
          <div className="relative">
            <button onClick={()=> setIsModalOpen(true)} className="cursor-pointer bg-base-100 px-3 pr-5 py-1 rounded-md hover:bg-base-300 transition duration-200 text-sm">
              See All
            </button>
            <span className="absolute right-1 mt-[3px] items-center justify-center">
              <MoveRight className="w-3 h-6" />
            </span>
          </div>
        </div>

            <TotalIncome start="5" end="10" />
      </div>

      {isModalOpen && (
        <SeeAllModal 
        title="Expenses Transactions"
        closeModal={setIsModalOpen}
        transactions={totalExpenseTransactions}
        />

      )}
    </div>
  );
}

export default IncomePage;
