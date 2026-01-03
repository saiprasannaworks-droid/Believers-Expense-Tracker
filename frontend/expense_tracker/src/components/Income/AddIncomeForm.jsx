import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';


const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
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

      {/* Source dropdown */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Income Source
      </label>
      <select
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        className="border rounded px-3 py-2 w-full text-sm font-medium
                   text-gray-900 dark:text-white
                   bg-white dark:bg-gray-800
                   border-gray-300 dark:border-gray-600 mb-2"
      >
        <option value="">Select Source</option>
        <option value="Salary">Salary</option>
        <option value="Freelance">Freelance</option>
        <option value="Investments">Investments</option>
        <option value="Others">Others</option>
      </select>

      {/* Amount */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Amount
      </label>
      <input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        type="number"
        className="border rounded px-3 py-2 w-full text-sm
                   text-gray-900 dark:text-white
                   bg-white dark:bg-gray-800
                   border-gray-300 dark:border-gray-600 mb-2"
      />

      {/* Date */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Date
      </label>
      <input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        type="date"
        className="border rounded px-3 py-2 w-full text-sm
                   text-gray-900 dark:text-white
                   bg-white dark:bg-gray-800
                   border-gray-300 dark:border-gray-600 mb-2"
      />

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

