import React, { useState } from 'react'
import { MoveRight } from 'lucide-react';   
import { useExpenseStore } from '../../store/useExpenseStore';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill, payload, percent, Amount,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize="16">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontWeight="bold">{`${Amount}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function Overview() {
    const { dashboardData } = useExpenseStore();

    const data = [
        { name: 'Total Balance', Amount: dashboardData?.totalBalance || 0, color: "#3B82F6" }, // primary blue
        { name: 'Total Income', Amount: dashboardData?.income?.total || 0, color: "#10B981" }, // green
        { name: 'Total Expense', Amount: dashboardData?.expense?.total || 0, color: "#EF4444" }, // red
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h1 className='font-medium text-xl'>Financial Overview</h1>
                {/* <div className="relative">
                    <button className="bg-base-100 px-3 pr-5 py-1 rounded-md hover:bg-gray-500 transition duration-200 text-sm">
                    See All
                    </button>
                    <span className="absolute right-1 top-1/2 transform -translate-y-1/2"><MoveRight className='w-3 h-3' /></span>
                </div> */}
            </div>

            <div className="flex-1 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            dataKey="Amount"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Overview