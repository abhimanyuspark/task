import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/server/server";
import { Error, Loading } from "../../../components";
import TaskMenu from "../../__comp/TaskMenu";

const TasksGrid = ({ globalFilter, columnFilters }) => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply global search filter
    if (globalFilter) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }

    // Apply date filter
    if (columnFilters.length > 0) {
      const { value: [start, end] } = columnFilters[0];
      filtered = filtered.filter((task) => {
        const date = new Date(task.created_At);
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;
      
        if (startDate && date < startDate) {
          return false;
        }
        if (endDate) {
          // Add one day to the end date to include it in the filter
          endDate.setDate(endDate.getDate() + 1);
          if (date >= endDate) {
            return false;
          }
        }
        return true;
      });
    }

    return filtered;
  }, [tasks, globalFilter, columnFilters]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !Array.isArray(tasks) || tasks.length === 0) {
    return <Error error={error} />;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks?.map((t, i) => (
        <li
          key={i}
          className="bg-white p-4 rounded-sm border border-slate-300 font-semibold flex flex-wrap justify-between"
        >
          <div className="flex gap-2 flex-col">
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>ID</span>
              <span>Task_ID_{t?.id}</span>
            </p>
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>Title</span>
              <span className="truncate w-52">{t?.title}</span>
            </p>
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>Status</span>
              <span>{t?.status}</span>
            </p>
          </div>

          <div>
            <TaskMenu id={t?.id} title={t?.title} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksGrid;
