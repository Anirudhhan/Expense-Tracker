import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { useExpenseStore } from '../../store/useExpenseStore';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const IncomeExpenseChart = () => {
  const { 
    totalIncomeTransactions, 
    totalExpenseTransactions, 
    getDashboardData, 
    isRecentTransactionLoading 
  } = useExpenseStore();
  
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    getDashboardData();
  }, []);

  // Process data for chart
  const chartData = useMemo(() => {
    const processTransactionsByPeriod = (transactions, type) => {
      const grouped = {};
      
      transactions.forEach(transaction => {
        const date = new Date(transaction.createdAt || transaction.date);
        let key;
        
        if (timeRange === 'daily') {
          key = date.toISOString().split('T')[0];
        } else if (timeRange === 'weekly') {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
        } else {
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }
        
        if (!grouped[key]) {
          grouped[key] = 0;
        }
        grouped[key] += transaction.amount || 0;
      });
      
      return grouped;
    };

    const incomeData = processTransactionsByPeriod(totalIncomeTransactions.filter(t => t.type === 'income'), 'income');
    const expenseData = processTransactionsByPeriod(totalExpenseTransactions.filter(t => t.type === 'expense'), 'expense');
    
    // Get all unique periods
    const allPeriods = [...new Set([...Object.keys(incomeData), ...Object.keys(expenseData)])].sort();
    
    return allPeriods.map(period => ({
      period,
      income: incomeData[period] || 0,
      expense: expenseData[period] || 0,
      net: (incomeData[period] || 0) - (expenseData[period] || 0)
    }));
  }, [totalIncomeTransactions, totalExpenseTransactions, timeRange]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);
    const netBalance = totalIncome - totalExpense;
    
    return { totalIncome, totalExpense, netBalance };
  }, [chartData]);

  // Check if there's any data to display
  const hasData = totalIncomeTransactions.length > 0 || totalExpenseTransactions.length > 0;

  const formatPeriodLabel = (period) => {
    if (timeRange === 'daily') {
      return new Date(period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeRange === 'weekly') {
      return `Week of ${new Date(period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      const [year, month] = period.split('-');
      return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-4 border border-base-200 rounded-lg shadow-lg">
          <p className="font-semibold text-base-100 mb-2">{formatPeriodLabel(label)}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-base-content/80 capitalize">{entry.dataKey}:</span>
              <span className="font-medium">₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isRecentTransactionLoading) {
    return (
      <div className="bg-base-100 rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-base-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-base-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-2">
        <h1 className="font-medium text-xl">Income vs Expenses</h1>
      </div>

      {/* Conditional rendering: Show chart only if there's data */}
      {hasData ? (
        <div className="sm:h-130 h-60">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
                  tickFormatter={formatPeriodLabel}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="url(#incomeGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="url(#expenseGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
                  tickFormatter={formatPeriodLabel}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#ef4444", strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
                  tickFormatter={formatPeriodLabel}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#incomeAreaGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stackId="2"
                  stroke="#ef4444"
                  fill="url(#expenseAreaGradient)"
                />
                <defs>
                  <linearGradient
                    id="incomeAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="expenseAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        // Empty State - only show when no data
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No data available</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Add some income or expense entries to see your financial overview
          </p>
        </div>
      )}
    </div>
  );
};

export default IncomeExpenseChart;