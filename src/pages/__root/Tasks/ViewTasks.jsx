import React, { useEffect } from "react";
import { useParams } from "react-router";
import { viewTask } from "../../../redux/server/server";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import { resetViewedTask } from "../../../redux/features/tasksSlice";

const ViewTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewedTask, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (id) {
      dispatch(viewTask(id));
    }
    return () => {
      dispatch(resetViewedTask());
    };
  }, [dispatch, id]);

  const CD = viewedTask.created_At
    ? `${new Date(viewedTask?.created_At).toLocaleDateString()} ${new Date(
        viewedTask?.created_At
      ).toLocaleTimeString()}`
    : "--";

  const UD = viewedTask.updated_At
    ? `${new Date(viewedTask?.updated_At).toLocaleDateString()} ${new Date(
        viewedTask?.updated_At
      ).toLocaleTimeString()}`
    : "--";

  return (
    <div className="p-4">
      {isLoading && <Loader />}
      <div className="flex gap-4 flex-col border border-slate-200 p-4 rounded-md bg-white">
        <h2 className="text-2xl font-bold">Task Details</h2>

        <hr />

        <ul className="grid gap-2 flex-col">
          <li className="grid gap-2 items-center grid-cols-2">
            <span className="font-semibold text-slate-600">Task Id</span>
            <span>Task_ID_{viewedTask.id || "--"}</span>
          </li>
          <li className="grid gap-2 items-center grid-cols-2">
            <span className="font-semibold text-slate-600">Title</span>
            <span>{viewedTask.title || "--"}</span>
          </li>
          <li className="grid gap-2 items-center grid-cols-2">
            <span className="font-semibold text-slate-600">Created At</span>
            <span>{CD}</span>
          </li>
          <li className="grid gap-2 items-center grid-cols-2">
            <span className="font-semibold text-slate-600">Updated At</span>
            <span>{UD}</span>
          </li>
          <li className="grid gap-2 items-center grid-cols-2">
            <span className="font-semibold text-slate-600">Status</span>
            <span className="first-letter:uppercase">{viewedTask.status || "--"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewTasks;
