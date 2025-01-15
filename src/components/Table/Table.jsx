import React, { useState, useMemo } from "react";
import SortingIcons from "./Sorts";
import { Select } from "../Inputs";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "../Icons";

const Table = ({
  Columns = [],
  data = [],
  setGlobalFilter,
  globalFilter,
  loading = false,
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const columns = useMemo(() => Columns, [Columns]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const Loading = () => {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="px-4 py-2 border border-slate-300 rounded-md bg-white">
          loading...
        </div>
      </div>
    );
  };

  const columnSpan = useMemo(() => {
    return table.getHeaderGroups().map((d) => d.headers.length);
  }, []);

  return (
    <div className="w-full lg:overflow-visible overflow-auto">
      <table className="w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th className="p-2" key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-1 cursor-pointer ${
                          header?.column?.id === "id" ? "justify-end" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <SortingIcons header={header} />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columnSpan}>{Loading()}</td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const isSelected = row.getIsSelected(row.id);
              return (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-200 ${
                    isSelected ? "bg-slate-300" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className={`w-auto p-2`} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columnSpan}>
                <div className="flex items-center justify-center p-2">
                  No Tasks Yet
                </div>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columnSpan} className="p-2">
              <div className="flex justify-normal sm:flex-row flex-col sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <label>
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()} | Go to page :
                    </label>
                    <Select
                      value={table.getState().pagination.pageIndex}
                      onChange={(e) => {
                        const page = e.target.value;
                        table.setPageIndex(page);
                      }}
                    >
                      {table.getPageOptions().map((i) => (
                        <option key={i} value={i}>
                          Page {i + 1}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="flex gap-2 items-center">
                    <label>Show : </label>
                    <Select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                      }}
                    >
                      {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </Select>
                    {/* <label>
                      {Object.keys(rowSelection).length} of{" "}
                      {table.getPreFilteredRowModel().rows.length} Total Rows
                      Selected
                    </label> */}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-slate-200 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <FaAngleDoubleLeft size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-slate-200 disabled:cursor-not-allowed"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <FaAngleLeft size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-slate-200 disabled:cursor-not-allowed"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <FaAngleRight size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-slate-200 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <FaAngleDoubleRight fontWeight={1} size={20} />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
