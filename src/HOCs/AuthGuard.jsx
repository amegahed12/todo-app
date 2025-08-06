import React from "react";
import { Navigate } from "react-router";
import { authApi } from "../services/authApi";

export default function AuthGuard({ children }) {
  const isAuthenticated = authApi.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}
