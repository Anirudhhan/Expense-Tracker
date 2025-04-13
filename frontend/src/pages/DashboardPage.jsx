import React from 'react'
import RecentTransaction from '../components/RecentTransaction';
import { WalletMinimal, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react';
import InfoCard from '../components/InfoCard';
import { useExpenseStore } from '../store/useExpenseStore';


function DashboardPage() {
  const { dashboardData } = useExpenseStore();

  return (
    <div className='bg-black/5 w-full h-screen p-10'>

        <div className = "grid grid-cols-3 gap-10 my-6">
          <InfoCard 
            icon={<WalletMinimal />}
            heading="Total Balance"
            color="bg-primary"
            amount= {dashboardData?.totalBalance}
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

        <div className="grid grid-cols-2 gap-6">

            <div className='h-100 bg-white rounded-md p-4'>
                <RecentTransaction/>
            </div>

            <div className="bg-black w-full h-100">
                overview

            </div>

        </div>        
    </div>
  )
}

export default DashboardPage