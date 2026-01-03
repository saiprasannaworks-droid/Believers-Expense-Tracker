import React from "react";

const ExpenseFilterBar = ({ filters, setFilters }) => {
  return (
    <div className="card mb-6 p-4 flex flex-wrap gap-4 items-center justify-between">
      {/* Category Filter */}
      <select
        className="border rounded px-3 py-2 text-sm add-btn add-btn-fill"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Others">Others</option>
      </select>

      {/* Date Range */}
      <input
        type="date"
        className="border border-red-600 rounded px-3 py-2 text-sm"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />
      <input
        type="date"
        className="border border-red-600 rounded px-3 py-2 text-sm"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />

      {/* Amount Range */}
      <input
        type="number"
        placeholder="Min- ₹"
        className="border border-red-600 rounded px-3 py-2 text-sm w-28"
        value={filters.minAmount}
        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max- ₹"
        className="border border-red-600 rounded px-3 py-2 text-sm w-28"
        value={filters.maxAmount}
        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
      />

      {/* Sort Option */}
      <select
        className="border rounded px-3 py-2 text-sm add-btn add-btn-fill"
        value={filters.sortBy}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
      >
        <option value="recent">Most Recent</option>
        <option value="amount">Highest Amount</option>
      </select>
    </div>
  );
};

export default ExpenseFilterBar;
