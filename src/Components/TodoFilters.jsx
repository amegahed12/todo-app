import React from "react";

export default function TodoFilters({ filters, setFilters, setCurrentPage }) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Filters & Sorting</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority-filter" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="name">Name</option>
            <option value="createdAt">Created Date</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sort-order" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sort Order
          </label>
          <select
            id="sort-order"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setFilters({
              status: "all",
              priority: "all",
              sortBy: "dueDate",
              sortOrder: "asc"
            });
            setCurrentPage(1);
          }}
          className="px-6 py-3 rounded-xl font-semibold text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 shadow-lg transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
} 