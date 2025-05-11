import React, { useRef } from 'react'
import { Plus } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AddEntryModal from '../modals/AddEntryModal';
import { useExpenseStore } from '../../store/useExpenseStore';


function IncomeOverview() {
  const addEntryModalRef = useRef(null);

  const handleOpenModal = () => {
    // Call the exposed openModal method
    addEntryModalRef.current.openModal();
  };

  const { totalExpenseTransactions } = useExpenseStore();

  const data = (totalExpenseTransactions || [])
  .filter(transaction => transaction && transaction.category && transaction.amount && transaction.date)
  .map((transaction) => ({
    category: transaction.category,
    amount: transaction.amount,
    date: new Date(transaction.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }))
  .reverse();

  return (
    <div>
    <div className="flex justify-between items-center">
      <h1 className='font-medium text-xl'>Expense Overview</h1>

      <div className="relative cursor-pointer">
        <div className="absolute inset-y-0 left-0 pl-1 flex items-center">
          <Plus className="h-5 w-5 text-primary font-medium" />
        </div>
        <button 
          onClick={handleOpenModal} 
          className="cursor-pointer hover:bg-primary/60 bg-primary/35 rounded-md text-primary font-medium w-full pl-6 pr-3 py-1"
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

<div className="h-70 sm:h-88 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
              tick={{ fill: "#666", fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{
                borderRadius: "6px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
            <Bar
              dataKey="amount"
              name="Amount"
              radius={[4, 4, 0, 0]}
              fill="#e7000b"
            >
              {
                /* Using cell to apply different opacity to alternating bars */
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#e7000b"
                    fillOpacity={index % 2 === 0 ? 1 : 0.6}
                  />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IncomeOverview;