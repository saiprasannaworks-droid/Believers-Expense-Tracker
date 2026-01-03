import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';


const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>

      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}

      />
      <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2 ">
        Category</label>
      <select value={income.category} onChange={(e) => handleChange("category", e.target.value)} 
      className="border rounded px-3 py-2 w-full text-sm font-medium 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-800 
             border-gray-300 dark:border-gray-600 
             mb-2" >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Others">Others</option>
      </select>

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button className="add-btn add-btn-fill "
          type="button"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm