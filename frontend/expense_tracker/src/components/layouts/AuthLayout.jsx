import React from 'react';
import chartPicture from '../../assets/images/chartPicture.png';
import {LuTrendingUpDown} from "react-icons/lu";
const AuthLayout = ({children}) => {
  return (
    <div className="flex">

      <div className="w-screen h-screen md:w=[60vw] px-10 pt-8 pb-12">
        <h2 className="text-5xl font-medium text-red-600">
        Believers Expense Tracker
        </h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-red-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative ">
        <div className="w-48 h-49 rounded-[40px] bg-red-500 absolute -top-7 -left-5 "></div>
        <div className="w-48 h-56 rounded-[50px] border-20 border-red-800 top-[30%] -right-15 absolute "></div>
        <div className="w-48 h-48 rounded-[40px] bg-red-500 absolute -bottom-7 -left-5"></div>

        <div className="grid gird-cols-1 z-20">
          <StatsInfoCard
          icon={<LuTrendingUpDown/>}
          label="Track Your Income & Expenses"
          value="430,000"
          color="bg-primary"
          />
        </div>

        <img src={chartPicture} alt="" className=" w-60  lg:w-[90%] h-[40%] absolute bottom-10 shadow-lg shadow-red-500/15   " 
        />
      
      </div>

  </div>

  );
};

export default AuthLayout

const StatsInfoCard = ({icon,label,value,color})=>{
return <div className="flex gap-6 bg-red-200 p-4 rounded-xl shadow-md shadow-red-900 border border-red-300 z-10 ">
  <div className="w-12 h-12 flex items-center justify-center text-[26px] text-red-100 bg-red-800 rounded-full drop-shadow-xl ">
    {icon}
  </div>
  <div>
    <h6 className="text-xs text-red-500 mb-1">{label}</h6>
    <span className="text-[20px] text-red-500 ">₹ {value}</span>
  </div>
</div>
}