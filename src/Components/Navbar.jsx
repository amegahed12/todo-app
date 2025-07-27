import React from "react";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const token = localStorage.getItem("token");
  console.log({ token });
  return (
    <div className="bg-red-50 mx-4 p-2 rounded flex justify-center items-center gap-3">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "bg-red-200" : "capitalize")}
      >
        home
      </NavLink>
      <Link to={"/about"} className="capitalize">
        about
      </Link>
      <NavLink to={"/contactus"} className="capitalize">
        contact us
      </NavLink>
      <NavLink to={"/products"} className="capitalize">
        Products
      </NavLink>
      <NavLink to={"/dashboard"} className="capitalize">
        Dashboard
      </NavLink>
      {!token && (
        <NavLink to={"/login"} className="capitalize">
          Login
        </NavLink>
      )}
    </div>
  );
}
