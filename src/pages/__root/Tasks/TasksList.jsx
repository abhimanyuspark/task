import React, { useEffect } from "react";
import { Columns } from "./Columns";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getTasks } from "../../../redux/server/server";

const TasksList = () => {
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <Table
      loading={isLoading}
      Columns={Columns}
      data={tasks}
      // globalFilter={globalFilter}
      // setGlobalFilter={setGlobalFilter}
    />
  );
};

export default TasksList;
