import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenseStore } from '../../store/useExpenseStore';
import { BarChart3, Grid3X3, TrendingDown, Eye } from 'lucide-react';

const CategoryExpenseBreakdown = () => {
  const { 
    totalExpenseTransactions, 
    getDashboardData, 
    isRecentTransactionLoading 
  } = useExpenseStore();
  
  const [viewType, setViewType] = useState('pie');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('amount');

  useEffect(() => {
    getDashboardData();
  }, []);

  // Color palette for categories
  const categoryColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#AED6F1'
  ];

  // Process expense data by category
  const categoryData = useMemo(() => {
    let filteredTransactions = totalExpenseTransactions.filter(t => t.type === 'expense');
    
    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.createdAt || t.date) >= filterDate
      );
    }

    // Group by category
    const grouped = {};
    filteredTransactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      if (!grouped[category]) {
        grouped[category] = {
          category,
          amount: 0,
          count: 0,
          transactions: []
        };
      }
      grouped[category].amount += transaction.amount || 0;
      grouped[category].count += 1;
      grouped[category].transactions.push(transaction);
    });

    // Convert to array and sort
    let categoryArray = Object.values(grouped);
    
    if (sortBy === 'amount') {
      categoryArray.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'count') {
      categoryArray.sort((a, b) => b.count - a.count);
    } else {
      categoryArray.sort((a, b) => a.category.localeCompare(b.category));
    }

    // Add colors and percentage
    const totalAmount = categoryArray.reduce((sum, item) => sum + item.amount, 0);
    return categoryArray.map((item, index) => ({
      ...item,
      color: categoryColors[index % categoryColors.length],
      percentage: totalAmount > 0 ? ((item.amount / totalAmount) * 100) : 0
    }));
  }, [totalExpenseTransactions, timeFilter, sortBy]);

  const totalExpense = categoryData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{data.category}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Amount: <span className="font-medium">₹{data.amount.toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-600">
              Percentage: <span className="font-medium">{data.percentage.toFixed(1)}%</span>
            </p>
            <p className="text-sm text-gray-600">
              Transactions: <span className="font-medium">{data.count}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage, category }) => {
    if (percentage < 5) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };

  if (isRecentTransactionLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold ">Category-wise Expenses</h2>
            <p className="text-sm text-gray-500">Breakdown of expenses by categories</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* View Type Selector */}
          <select 
            value={viewType} 
            onChange={(e) => setViewType(e.target.value)}
            className="px-3 py-2 border bg-base-300 rounded-lg text-sm focus:outline-none "
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
          
          {/* Time Filter */}
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border bg-base-300 rounded-lg text-sm focus:outline-none"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          
          {/* Sort By */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border bg-base-300 rounded-lg text-sm focus:outline-none "
          >
            <option value="amount">Sort by Amount</option>
            <option value="count">Sort by Count</option>
            <option value="alphabetical">Sort Alphabetically</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r  p-4 rounded-lg bg-base-content/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-500">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${totalExpense.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r  p-4 rounded-lg bg-base-content/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Categories</p>
              <p className="text-2xl font-bold text-blue-500">{categoryData.length}</p>
            </div>
            <Grid3X3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r p-4 rounded-lg bg-base-content/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-400">Avg per Category</p>
              <p className="text-2xl font-bold text-green-500">
                ₹{categoryData.length > 0 ? (totalExpense / categoryData.length).toFixed(0) : '0'}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={PieLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20,  }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category List */}
        <div className="xl:col-span-1">
          <div className="bg-base-300 rounded-lg p-4 h-80 overflow-y-auto">
            <h3 className="font-semibold bg-base-300 mb-4 sticky top-0  pb-2">
              Category Details
            </h3>
            <div className="space-y-3">
              {categoryData.map((category, index) => (
                <div key={category.category} className=" p-3 rounded-lg border bg-base-content/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium  text-sm truncate">
                        {category.category}
                      </span>
                    </div>
                    <span className="text-xs text-base-content/90 font-medium">
                      {category.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-base-content/80">
                    <span>₹{category.amount.toLocaleString()}</span>
                    <span>{category.count} transaction{category.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {categoryData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No expense data available</p>
          <p className="text-gray-400 text-sm">Add some expense entries to see category breakdown</p>
        </div>
      )}
    </div>
  );
};

export default CategoryExpenseBreakdown;