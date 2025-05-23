import React from 'react'
import RecentTransaction from '../components/dashboard/RecentTransaction';
import { WalletMinimal, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react';
import InfoCard from '../components/dashboard/InfoCard';
import { useExpenseStore } from '../store/useExpenseStore';
import Overview from '../components/dashboard/Overview';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';


function DashboardPage() {
  const { dashboardData } = useExpenseStore();

  return (
<div className='bg-black/5 w-full min-h-screen p-4 md:p-10 mt-12 sm:mt-0'>
    {/* Info Cards - 3 columns on desktop, 1 column on mobile */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 my-4 md:my-6">
        <InfoCard 
            icon={<WalletMinimal />}
            heading="Total Balance"
            color="bg-primary"
            amount={dashboardData?.totalBalance}
        />          
        
        <InfoCard 
            icon={<BanknoteArrowDown />}
            heading="Total Income"
            color="bg-green-600"
            amount={dashboardData?.income?.total}
        />          
        
        <InfoCard 
            icon={<BanknoteArrowUp />}
            heading="Total Expense"
            color="bg-red-600"
            amount={dashboardData?.expense?.total}
        />
    </div>

    {/* Charts and Recent Transactions - 2 columns on desktop, 1 column on mobile */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className='bg-base-100 rounded-xl p-4 shadow-sm h-auto md:h-125'>
            <RecentTransaction/>
        </div>

        <div className="bg-base-100 p-4 rounded-xl shadow-sm h-auto md:h-125">
            <Overview/>
        </div>

        <div className="bg-base-100 p-4 rounded-xl shadow-sm h-auto md:h-125">
            <IncomeExpenseChart/>
        </div>
    </div>        
</div>
  )
}

export default DashboardPage