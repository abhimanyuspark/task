import React, { useEffect } from "react";
import { Columns } from "./Columns";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getTasks } from "../../../redux/server/server";

const TasksList = ({
  globalFilter,
  setGlobalFilter,
  setColumnFilters,
  columnFilters,
}) => {
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <div className="flex gap-4 p-4 flex-col sm:items-start items-stretch bg-white border border-slate-300 rounded-sm">
      <Table
        loading={isLoading}
        Columns={Columns}
        data={tasks}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};

export default TasksList;
