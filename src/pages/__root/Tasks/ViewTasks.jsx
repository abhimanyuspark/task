import React, { useEffect } from "react";
import { useParams } from "react-router";
import { viewTask } from "../../../redux/server/server";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components";

const ViewTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewedTask, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (id) {
      dispatch(viewTask(id));
    }
  }, [dispatch, id]);

  if(isLoading){
    <Loading />
  }

  const up = viewedTask.updated_At ? `${new Date(viewedTask?.updated_At).toLocaleDateString()} ${new Date(viewedTask?.updated_At).toLocaleTimeString()}` : "--"

  return (
    <div className="flex gap-4 flex-col">
      <h2 className="text-2xl font-bold">Task Details</h2>

      <hr />

      <ul className="grid gap-2 flex-col">
        <li className="grid gap-2 items-center grid-cols-2">
          <span className="font-bold">Task Id</span>
          <span>Task_ID_{viewedTask?.id}</span>
        </li>
        <li className="grid gap-2 items-center grid-cols-2">
          <span className="font-bold">Title</span>
          <span>{viewedTask?.title}</span>
        </li>
        <li className="grid gap-2 items-center grid-cols-2">
          <span className="font-bold">Created At</span>
          <span>{`${new Date(viewedTask?.created_At).toLocaleDateString()} ${new Date(viewedTask?.created_At).toLocaleTimeString()}` }</span>
        </li>
        <li className="grid gap-2 items-center grid-cols-2">
          <span className="font-bold">Updated At</span>
          <span>{up}</span>
        </li>
        <li className="grid gap-2 items-center grid-cols-2">
          <span className="font-bold">Status</span>
          <span>{viewedTask.status ? "Completed" : "In complete"}</span>
        </li>
      </ul>
    </div>
  );
};

export default ViewTasks;
