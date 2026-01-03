import React from "react";

const IncomeFilterBar = ({ filters, setFilters }) => {
  return (
    <div className="card mb-6 p-4 flex flex-wrap gap-4 items-center justify-between">
      {/* Source Filter */}
      <select
        className="border rounded px-3 py-2 text-sm add-btn add-btn-fill"
        value={filters.source}
        onChange={(e) => setFilters({ ...filters, source: e.target.value })}
      >
        <option value="">All Sources</option>
        <option value="Salary">Salary</option>
        <option value="Freelance">Freelance</option>
        <option value="Investments">Investments</option>
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

export default IncomeFilterBar;
