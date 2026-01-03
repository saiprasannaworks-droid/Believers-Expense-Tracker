import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS =["#15803d","#cc0000","#FF6900"];


const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {


  const balanceData= [
    { name: "Total Balance", amount : totalBalance },
    { name: "Total Expense", amount : totalExpense },
    { name: "Total Income", amount : totalIncome },
  ]

  return <div className="card">
    <div className="flex items-center justify-between" >
      <h5 className="text-lg">Financial Overview </h5>
    </div>

    <CustomPieChart
    
    data={balanceData}
    label="Total Balance"
    totalAmount={`₹${totalBalance}`}
    colors={COLORS}
    showTextAnchor
    />

  </div>
};

export default FinanceOverview