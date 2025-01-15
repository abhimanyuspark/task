import React from "react";
import TasksList from "./Tasks/TasksList";
import { Button } from "../../components";
import { FaPlus } from "../../components/Icons";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 flex-col">
      <Button
        onClick={() => {
          navigate("/add");
        }}
        text="Add Tasks"
        icon={<FaPlus />}
      />

      <TasksList />
    </div>
  );
};

export default Dashboard;
