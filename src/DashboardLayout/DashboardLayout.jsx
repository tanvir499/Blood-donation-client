import React from "react";
import { Outlet } from "react-router";
import Aside from "../Components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex">
        <Aside />
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
