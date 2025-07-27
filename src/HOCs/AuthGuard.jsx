import React from "react";

export default function AuthGuard({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) return <h1>You Are un Authenticated</h1>;

  return <div>{children}</div>;
}
