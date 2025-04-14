import React, { useRef } from 'react'
import { Plus } from 'lucide-react';
import AddEntryModal from '../modals/AddEntryModal';


function IncomeOverview() {
  const addEntryModalRef = useRef(null);

  const handleOpenModal = () => {
    // Call the exposed openModal method
    addEntryModalRef.current.openModal();
  };

  return (
    <div>
    <div className="flex justify-between items-center">
      <h1 className='font-medium text-xl'>Expense Overview</h1>

      <div className="relative cursor-pointer">
        <div className="absolute inset-y-0 left-0 pl-1 flex items-center">
          <Plus className="h-5 w-5 text-base-content/40 text-primary font-medium" />
        </div>
        <button 
          onClick={handleOpenModal} 
          className="cursor-pointer bg-primary/35 rounded-md text-primary font-medium w-full pl-6 pr-3 py-1"
        >
          Add Expense
        </button>
      </div>

    </div>
      <AddEntryModal 
        ref={addEntryModalRef}
        type="expense" 
        name="Add Expense" 
      />
    </div>
  )
}

export default IncomeOverview;