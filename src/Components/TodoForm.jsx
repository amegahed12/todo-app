import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters")
    .max(100, "Task name must be less than 100 characters"),
  description: yup
    .string()
    .max(500, "Description must be less than 500 characters"),
  priority: yup
    .string()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Invalid priority"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .min(new Date(), "Due date cannot be in the past"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["pending", "completed"], "Invalid status"),
});

export default function TodoForm({ todo, onSubmit, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: todo?.name || "",
      description: todo?.description || "",
      priority: todo?.priority || "medium",
      dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : "",
      status: todo?.status || "pending",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {todo ? "Edit Todo" : "Add New Todo"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Task Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Task Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
            placeholder="Enter task name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200 resize-none"
            placeholder="Enter task description (optional)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.description}</p>
          )}
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Priority *
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.priority && formik.errors.priority && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.priority}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.status}</p>
            )}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Due Date *
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.dueDate}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 shadow-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="px-6 py-3 rounded-xl font-semibold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Saving..." : (todo ? "Update Todo" : "Create Todo")}
          </button>
        </div>
      </form>
    </div>
  );
} 