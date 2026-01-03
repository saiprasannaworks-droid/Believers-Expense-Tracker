import React, { useEffect, useState } from 'react'
import CustomPieChart from '../../components/Charts/CustomPieChart'

const COLORS =["#15803d","#cc0000","#FF6900","#228B22"];

const RecentIncomeWithChart = ({data, totalIncome}) => {

  const [chartData, setCharData]= useState([]);

  const prepareChartData=()=>{
    const dataArr= data?.map((item)=>({
    name:item?.source,
    amount:item?.amount,
    }));

    setCharData(dataArr);

  };

  useEffect(()=>{
    prepareChartData();
  },[data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg" >
            Last 60 Days Income 
        </h5>
      </div>

      <CustomPieChart
      
      data={chartData}
      label="Total Income"
      totalAmount={`$${totalIncome}`}
      showTextAnchor
      colors={COLORS}
      />

    </div>
  )
}

export default RecentIncomeWithChart