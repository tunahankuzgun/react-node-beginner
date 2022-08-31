import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Sea</h1>
      <Outlet />
    </div>
  );
}
