import React, { useEffect, useState } from "react";
import TasksList from "./Tasks/TasksList";
import TasksGrid from "./Tasks/TasksGrid";
import {
  Button,
  ClearButton,
  DateFilter,
  Input,
  SwitchButton,
} from "../../components";
import { FaPlus, FaSearch } from "../../components/Icons";
import { useNavigate, useSearchParams } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useSearchParams();
  const [view, setView] = useState(temp.get("view") || "list");
  const [columnFilters, setColumnFilters] = useState([]);

  const handleDateFilterChange = (startDate, endDate) => {
    setColumnFilters([{ id: "created_At", value: [startDate, endDate] }]);
    setShow(true);
  };

  const onClear = () => {
    setQuery("");
    setColumnFilters([]);
    setShow(false);
  };

  const onSwitch = () => {
    const check = view === "list" ? "grid" : "list";
    setView(check);
    setTemp({ view: check });
  };

  useEffect(() => {
    const check = temp.get("view") || "list";
    setView(check);
  }, [temp]);

  return (
    <div className="flex flex-col">
      <div className="py-2 px-8 border-b bg-white border-slate-300 w-full flex flex-wrap items-center gap-4 justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        {/* Date filter */}
        <DateFilter value={columnFilters} onChange={handleDateFilterChange} />

        {/* serach filter */}
        <div className="flex items-center sm:w-auto w-full">
          <div className="size-9 flex items-center justify-center bg-slate-500 rounded-l-sm">
            <FaSearch className="size-4 text-white" />
          </div>

          <Input
            value={query}
            onChange={(e) => {
              setQuery(e);
              setShow(true);
            }}
            className="sm:w-52 w-full"
            placeholder="Search tasks here..."
          />
        </div>

        {/* clear */}
        {show ? <ClearButton onClick={onClear} /> : ""}
      </div>

      <div className="p-8 w-full">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              navigate("/add");
            }}
            text="Add Tasks"
            icon={<FaPlus />}
          />

          <SwitchButton onClick={onSwitch} value={view} />
        </div>
        <br />

        {view === "list" ? (
          <TasksList
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            globalFilter={query}
            setGlobalFilter={setQuery}
          />
        ) : (
          <TasksGrid globalFilter={query} columnFilters={columnFilters} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
