import React from 'react'
import IncomeOverview from '../components/income/IncomeOverview'

function IncomePage() {
  return (
  <div className='bg-black/5 w-full min-h-screen p-4 md:p-10'>
    <div className='bg-white rounded-md p-4 shadow-sm h-auto md:h-109'>
      <IncomeOverview/>
    </div>
  </div>
  )
}

export default IncomePage