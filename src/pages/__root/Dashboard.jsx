import React from "react";
import TasksList from "./Tasks/TasksList";
import { Button } from "../../components";
import { FaPlus } from "../../components/Icons";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 flex-col items-start">
      <div className="p-6 border-b bg-white border-slate-300 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>

      <div className="p-8 w-full">
        <div className="flex gap-4 p-4 flex-col sm:items-start items-stretch bg-white border border-slate-300 rounded-md">
          <Button
            onClick={() => {
              navigate("/add");
            }}
            text="Add Tasks"
            icon={<FaPlus />}
          />

          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
