import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, CreditCard, ShoppingCart, Coffee, Car, Home, Zap } from 'lucide-react';

const SkeletonPreview = () => {
  // Dummy data for charts
  const monthlyData = [
    { month: 'Jan', income: 4800, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 3800 },
    { month: 'Mar', income: 4900, expense: 3500 },
    { month: 'Apr', income: 5500, expense: 4200 },
    { month: 'May', income: 5800, expense: 3900 },
    { month: 'Jun', income: 6200, expense: 4500 }
  ];

  const expenseCategories = [
    { name: 'Food', value: 12000, color: '#FF6B6B' },
    { name: 'Transport', value: 8000, color: '#4ECDC4' },
    { name: 'Shopping', value: 6000, color: '#45B7D1' },
    { name: 'Utilities', value: 4000, color: '#96CEB4' },
    { name: 'Others', value: 3000, color: '#FECA57' }
  ];

  const weeklySpending = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 80 },
    { day: 'Wed', amount: 150 },
    { day: 'Thu', amount: 90 },
    { day: 'Fri', amount: 200 },
    { day: 'Sat', amount: 250 },
    { day: 'Sun', amount: 180 }
  ];

  const recentTransactions = [
    { icon: Coffee, name: 'Starbucks Coffee', amount: -250.50, type: 'expense', color: 'bg-amber-500' },
    { icon: ShoppingCart, name: 'Amazon Purchase', amount: -500.99, type: 'expense', color: 'bg-blue-500' },
    { icon: TrendingUp, name: 'Salary Deposit', amount: 35000, type: 'income', color: 'bg-green-500' },
    { icon: Car, name: 'Gas Station', amount: -2000.20, type: 'expense', color: 'bg-red-500' },
    { icon: Zap, name: 'Electricity Bill', amount: -2500.50, type: 'expense', color: 'bg-yellow-500' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-base-50 via-base-50 to-base-100 p-6 overflow-auto sm:block hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ExpenseTracker Pro
          </h1>
          <p className="text-base-content/80 text-lg">Take control of your finances with beautiful insights</p>
        </div> */}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600 w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-base-content/60 text-sm font-medium mb-1">Total Income</h3>
            <p className="text-3xl font-bold ">₹60,200</p>
            <p className="text-base-content/70 text-sm mt-1">This month</p>
          </div>

          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="text-red-600 w-6 h-6" />
              </div>
              <span className="text-red-600 text-sm font-medium bg-red-100 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-base-content/60 text-sm font-medium mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-base-content/95">₹40,500</p>
            <p className="text-base-content/80 text-sm mt-1">This month</p>
          </div>

          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Wallet className="text-blue-600 w-6 h-6" />
              </div>
              <span className="text-blue-600 text-sm font-medium bg-blue-100 px-2 py-1 rounded-full">Saved</span>
            </div>
            <h3 className="text-base-content/60 text-sm font-medium mb-1">Net Balance</h3>
            <p className="text-3xl font-bold text-base-content/95">₹19,700</p>
            <p className="text-base-content/80 text-sm mt-1">Available</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expense Chart */}
          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100">
            <h3 className="text-xl font-semibold text-base-content/95 mb-4">Income vs Expenses</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-base-content/80" />
                  <YAxis hide />
                  <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fill="url(#incomeGradient)" />
                  <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fill="url(#expenseGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-base-content/60">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-base-content/60">Expenses</span>
              </div>
            </div>
          </div>

          {/* Expense Categories Donut Chart */}
          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100">
            <h3 className="text-xl font-semibold text-base-content/95 mb-4">Expense Categories</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-base-content/60">{category.name}</span>
                  <span className="text-sm font-medium text-base-content/95">₹{category.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Spending & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Spending */}
          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100">
            <h3 className="text-xl font-semibold text-base-content/95 mb-4">Weekly Spending</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="200%">
                <BarChart data={weeklySpending}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-base-content/80" />
                  <YAxis hide />
                  <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-base-300 rounded-2xl p-6 shadow-lg border border-base-100">
            <h3 className="text-xl font-semibold text-base-content/95 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${transaction.color} rounded-xl flex items-center justify-center`}>
                      <transaction.icon className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-base-content/95">{transaction.name}</p>
                      <p className="text-sm text-base-content/80">Today</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to take control?</h2>
            <p className="text-blue-100 mb-4">Join thousands of users managing their finances smarter</p>
            <div className="flex justify-center gap-4">
              <div className="bg-base-300/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">📊 Beautiful Charts</span>
              </div>
              <div className="bg-base-300/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">💰 Budget Tracking</span>
              </div>
              <div className="bg-base-300/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">📱 Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPreview;