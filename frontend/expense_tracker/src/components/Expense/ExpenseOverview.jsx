import React, { useEffect, useState } from 'react'
import {LuPlus} from "react-icons/lu"
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({onExpenseIncome,transactions}) => {
   const [charData, setCharData] = useState([])
    useEffect(()=>{
      const result= prepareExpenseLineChartData(transactions);
      setCharData(result);
  
        return()=>{};    
    },[transactions]);
  return (
        <div className="card">
      <div className="flex items-center justify-between ">
        <div className="className">
          <h5 className="text-lg">
            Expense OverView
          </h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and gain insights over 
            your Expense trends
          </p>
        </div>
        <button className="add-btn" onClick={onExpenseIncome} >
        <LuPlus className="" /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={charData} />
      </div>

    </div>
  )
  
}

export default ExpenseOverview