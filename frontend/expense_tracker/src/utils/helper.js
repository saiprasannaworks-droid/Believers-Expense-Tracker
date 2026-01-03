import moment from "moment";


export const validateEmail = (email)=>{
  const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name)=>{
  if(!name) return"";

  const words = name.split(" ");
  let initials= "";

  for(let i=0; i< Math.min(words.length,2);i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();

};

export const addThousandsSeparator=(num)=>{

  if(num == null || isNaN (num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

  return fractionalPart
  ? `${formattedInteger}.${fractionalPart}`
  : formattedInteger;
};

// export const prepareExpenseBarCharData=(data=[])=>{
//   const charData = data.map((item)=>({
//     category: item?.category,
//     amount: item?.amount,
//   }));

//   return charData;
// }; got error due to month storage format in mongo db 

export const prepareExpenseBarCharData = (data = []) => {
  return data.map((item) => ({
    month: moment(item.date).format("MMM DD"), // e.g. "Dec 08"
    amount: item?.amount,
    category: item?.category, // keep if you want tooltip info
  }));
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedData.map((item) => ({
    month: moment(item.date).format("MMM DD"),
    amount: item?.amount,
    source: item?.source,
  }));
};
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const charData= sortedData.map((item) => ({
    month: moment(item.date).format("MMM DD"),
    amount: item?.amount,
    category: item?.category,
  }));
  return charData;
};

