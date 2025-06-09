import { UsersTable } from "@/components/usersTable";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 w-full bg-white rounded-2xl">
      <UsersTable />
    </div>
  );
};

export default Dashboard;
