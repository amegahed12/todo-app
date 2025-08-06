import React from "react";
import { useNavigate } from "react-router";
import { authApi } from "../services/authApi";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = authApi.isAuthenticated();

  // Redirect authenticated users to todos page
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-10 w-full flex flex-col items-center border border-gray-200 dark:border-gray-800">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
            Organize Your Life
            <span className="block text-indigo-600 dark:text-indigo-400 mt-2">One Task at a Time</span>
          </h1>
          <p className="mt-4 mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-300 text-center">
            Stay organized and boost your productivity with our intuitive todo application. Create, manage, and track your tasks with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-colors duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-base bg-white dark:bg-gray-800 border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-900 shadow-lg transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 w-full bg-white/80 dark:bg-gray-900/80 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-4">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to stay organized
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              iconBg="bg-indigo-500"
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              title="Task Management"
              desc="Create, edit, and delete tasks with ease. Set priorities and due dates to keep track of what matters most."
            />
            <FeatureCard
              iconBg="bg-indigo-500"
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              }
              title="Smart Filtering"
              desc="Filter tasks by status and priority. Sort by due date, name, or creation date to find what you need quickly."
            />
            <FeatureCard
              iconBg="bg-indigo-500"
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Progress Tracking"
              desc="Mark tasks as completed and track your progress. Visual indicators help you see what's done and what's pending."
            />
            <FeatureCard
              iconBg="bg-indigo-500"
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="User-Friendly"
              desc="Clean, intuitive interface designed for the best user experience. Responsive design works on all devices."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, iconBg, title, desc }) {
  return (
    <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 shadow-lg border border-gray-100 dark:border-gray-800 backdrop-blur-md">
      <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${iconBg} text-white dark:text-white shadow-md shrink-0`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base">{desc}</p>
      </div>
    </div>
  );
}
