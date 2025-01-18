import { Link } from "react-router";
import TaskMenu from "../../__comp/TaskMenu";
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
        <div className="cursor-pointer w-52 sm:w-auto">
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
      return (
        <span className="w-44 block">
          {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
        </span>
      );
    },
    sortDescFirst: false,
    filterFn: "myCustomFilterFn",
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
      return <span className="w-28 block">{value}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "id",
    enableSorting: false,
    header: () => "Actions",
    cell: (info) => {
      const { id, title } = info.row.original;
      return <TaskMenu id={id} title={title} />;
    },
  },
];
