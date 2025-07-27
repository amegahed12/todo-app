import { NavLink, Outlet } from "react-router";

export default function Dashbaord() {
  return (
    <div>
      <div>
        <NavLink to={"profile"}>Profile</NavLink>
        <NavLink to={"settings"}>Settings</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
