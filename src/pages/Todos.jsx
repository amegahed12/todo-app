import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { authApi } from "../services/authApi";
import { todosApi } from "../services/todosApi";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import TodoFilters from "../Components/TodoFilters";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const currentUser = useMemo(() => authApi.getCurrentUser(), []);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      let allTodos = await todosApi.getTodos(currentUser.id);
      // Apply filters
      let filteredTodos = allTodos;
      if (filters.status !== "all") {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.status === filters.status
        );
      }
      if (filters.priority !== "all") {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.priority === filters.priority
        );
      }
      // Apply sorting
      filteredTodos.sort((a, b) => {
        let aValue, bValue;
        switch (filters.sortBy) {
          case "dueDate":
            aValue = new Date(a.dueDate);
            bValue = new Date(b.dueDate);
            break;
          case "priority": {
            // fix this issue
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[a.priority] || 0;
            bValue = priorityOrder[b.priority] || 0;
            break;
          }
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          default:
            aValue = a.createdAt;
            bValue = b.createdAt;
        }
        if (filters.sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      // Apply pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedTodos = filteredTodos.slice(startIndex, endIndex);
      setTodos(paginatedTodos);
      setTotalPages(Math.ceil(filteredTodos.length / itemsPerPage));
    } catch (error) {
      toast.error("Failed to load todos");
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, filters, currentPage]);

  useEffect(() => {
    if (currentUser?.id) {
      loadTodos();
    }
  }, [loadTodos, currentUser?.id]);

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await todosApi.createTodo({
        ...todoData,
        userId: currentUser.id,
      });
      setTodos((prev) => [newTodo, ...prev]);
      setShowForm(false);
      toast.success("Todo created successfully!");
    } catch (error) {
      toast.error(`Failed to create todo ${error}`);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todosApi.updateTodo(id, todoData);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditingTodo(null);
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error(`Failed to update todo ${error}`);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todosApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error(`Failed to delete todo ${error}`);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const updatedTodo = await todosApi.toggleTodoStatus(id, currentStatus);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success(`Todo marked as ${updatedTodo.status}!`);
    } catch (error) {
      toast.error(`Failed to toggle todo status ${error}`);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="w-full max-w-4xl mx-auto px-4 py-10">
        <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                My Todos
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-300">
                Welcome back, {currentUser?.username}!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 rounded-xl font-semibold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-colors duration-200"
              >
                + Add Todo
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl font-semibold text-base bg-white dark:bg-gray-800 border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-900 shadow-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <TodoFilters
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Todo Form */}
          {showForm && (
            <div className="mb-8">
              <TodoForm
                onSubmit={handleCreateTodo}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {/* Edit Todo Form */}
          {editingTodo && (
            <div className="mb-8">
              <TodoForm
                todo={editingTodo}
                onSubmit={(todoData) =>
                  handleUpdateTodo(editingTodo.id, todoData)
                }
                onCancel={() => setEditingTodo(null)}
              />
            </div>
          )}

          {/* Todo List */}
          <div className="mb-8">
            <TodoList
              todos={todos}
              onEdit={setEditingTodo}
              onDelete={handleDeleteTodo}
              onToggleStatus={handleToggleStatus}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-base text-gray-700 dark:text-gray-200">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
