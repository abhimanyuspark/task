import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteTask } from "../../redux/server/server";
import { MenuOptions } from "../../components";
import { MenuItem } from "@headlessui/react";
import { FaEdit, FaTrash, FaEye } from "../../components/Icons";

const tableMenuData = [
  {
    action: "edit",
    value: "Edit",
    key: "E",
    icon : <FaEdit className="size-4" />
  },
  {
    action: "view",
    value: "View",
    key: "V",
    icon : <FaEye className="size-4" />
  },
  {
    action: "delete",
    value: "Delete",
    key: "D",
    icon : <FaTrash className="size-4" />
  },
];

const TaskMenu = ({ id, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleActions = (action, id) => {
    if (action === "edit") {
      navigate(`/edit/${id}`, { state: { from: location } });
    } else if (action === "view") {
      navigate(`/view/${id}`, { state: { from: location } });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${title} task!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteTask(id));
          toast.success(title + " Task Deleted SuccessFully");
        }
      });
    }
  };

  return (
    <MenuOptions>
      {tableMenuData?.map((m, i) => (
        <MenuItem key={i}>
          <button
            className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-gray-100"
            onClick={() => {
              handleActions(m.action, id);
            }}
          >
            {m.icon}
            {m.value}
            <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
              ⌘{m.key}
            </kbd>
          </button>
        </MenuItem>
      ))}
    </MenuOptions>
  );
};

export default TaskMenu;
