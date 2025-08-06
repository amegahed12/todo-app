import React from "react";

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};

export default function TodoList({ todos, onEdit, onDelete, onToggleStatus }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No todos yet</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get started by creating your first todo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div key={todo.id} className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Checkbox */}
              <button
                onClick={() => onToggleStatus(todo.id, todo.status)}
                className={`flex-shrink-0 h-5 w-5 rounded border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  todo.status === "completed"
                    ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {todo.status === "completed" && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Todo Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3
                    className={`text-lg font-semibold text-gray-900 dark:text-white ${
                      todo.status === "completed" ? "line-through text-gray-500 dark:text-gray-400" : ""
                    }`}
                  >
                    {todo.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}
                  >
                    {todo.priority}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[todo.status]}`}
                  >
                    {todo.status}
                  </span>
                </div>
                {todo.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {todo.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                  <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(todo)}
                className="p-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors duration-200"
                title="Edit todo"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                title="Delete todo"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 