import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
