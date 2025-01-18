import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/server/server";
import { Error, Loading } from "../../../components";
import TaskMenu from "../../__comp/TaskMenu";

const TasksGrid = ({ globalFilter, columnFilters }) => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);

  const filter = () => {
    if (globalFilter !== "") {
      return tasks?.filter((t) => {
        return t;
      });
    }
    return tasks;
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    <Error error={error} />;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filter()?.map((t, i) => (
        <li
          key={i}
          className="bg-white p-4 rounded-sm border border-slate-300 font-semibold flex flex-wrap justify-between"
        >
          <div className="flex gap-2 flex-col">
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>ID</span>
              <span>Task_ID_{t.id}</span>
            </p>
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>Title</span>
              <span className="truncate w-52">{t.title}</span>
            </p>
            <p className="grid grid-cols-[80px_minmax(auto,1fr)]">
              <span>Status</span>
              <span>{t.status}</span>
            </p>
          </div>

          <div>
            <TaskMenu id={t.id} title={t.title} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksGrid;
