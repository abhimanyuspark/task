import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { MenuOptions } from "../../../components";
import { FaEdit, FaTrash, FaEye } from "../../../components/Icons";
import { MenuItem } from "@headlessui/react";
import { deleteTask } from "../../../redux/server/server";
// import { statusData } from "../../../data/data";

export const Columns = [
  {
    accessorKey: "index",
    header: "Id",
    cell: (info) => {
      const index = info.row.index;
      return <span>{index + 1}</span>;
    },
    enableSorting: true,
    sortingFn: (row1, row2) => {
      return row1.index > row2.index ? -1 : 1;
    },
    sortDescFirst: false,
    invertSorting: true,
  },
  {
    accessorKey: "title",
    header: () => "Title",
    cell: (info) => {
      const value = info.getValue();
      const { id } = info.row.original;
      return (
        <div className="cursor-pointer w-44 sm:w-auto">
          <Link
            to={`/view/${id}`}
            className="text-sm hover:underline text-slate-700 font-semibold"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "created_At",
    header: () => <span>Created At</span>,
    cell: (info) => {
      const value = info.getValue();
      const date = new Date(value);
      return <span className="w-32 block">{date.toLocaleDateString() + " " + date.toLocaleTimeString()}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    // cell: (info) => {
    //   const value = info.getValue();
    //   const [state, setState] = useState(value);

    //   return (
    //     <Select
    //       onChange={(e) => {
    //         setState(e.target.value);
    //         toast.success(`${state ? "Completed" : "In complete"}`);
    //       }}
    //       value={state}
    //     >
    //       {statusData.map((s, i) => (
    //         <option key={i} value={s.value}>
    //           {s.name}
    //         </option>
    //       ))}
    //     </Select>
    //   );
    // },
    cell: (info) => {
      const value = info.getValue();
      return value;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "id",
    enableSorting: false,
    header: () => "Actions",
    cell: (info) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
      const { id, title } = info.row.original;

      const Edit = (id) => {
        navigate(`/edit/${id}`, {
          state: { from: location },
        });
      };

      const View = (id) => {
        navigate(`/view/${id}`, { state: { from: location } });
      };

      const Delete = (id) => {
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
      };

      return (
        <MenuOptions>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-gray-100"
              onClick={() => {
                Edit(id);
              }}
            >
              <FaEdit className="size-4" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-gray-100"
              onClick={() => {
                View(id);
              }}
            >
              <FaEye className="size-4" />
              View
              <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                ⌘V
              </kbd>
            </button>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-gray-100"
              onClick={() => {
                Delete(id);
              }}
            >
              <FaTrash className="size-4" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuOptions>
      );
    },
  },
];
