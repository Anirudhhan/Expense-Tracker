import React from 'react'
import RecentTransaction from '../components/RecentTransaction';


function DashboardPage() {

  return (
    <div className='bg-black/5 w-full h-screen p-10'>
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