import React from 'react'
import ExpenseOverview from '../components/expense/ExpenseOverview'

function ExpensePage() {
  return (
    <div className='bg-black/5 w-full min-h-screen p-4 md:p-10'>
    <div className='bg-white rounded-md p-4 shadow-sm h-auto md:h-109'>
      <ExpenseOverview/>
    </div>
  </div>
  )
}

export default ExpensePage