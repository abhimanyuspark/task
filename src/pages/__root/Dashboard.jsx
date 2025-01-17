import React, { useState } from "react";
import TasksList from "./Tasks/TasksList";
import { Button, ClearButton, DateFilter, Input } from "../../components";
import { FaPlus, FaSearch } from "../../components/Icons";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
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

  return (
    <div className="flex flex-col">
      <div className="py-2 px-8 border-b bg-white border-slate-300 w-full flex flex-wrap items-center gap-4 justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        {/* Date filter */}
        <DateFilter value={columnFilters} onChange={handleDateFilterChange} />

        {/* clear */}
        {show ? <ClearButton onClick={onClear} /> : ""}

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
            placeholder="Serach tasks here..."
          />
        </div>
      </div>

      <div className="p-8 w-full">
        <Button
          onClick={() => {
            navigate("/add");
          }}
          text="Add Tasks"
          icon={<FaPlus />}
        />

        <br />

        <div className="flex gap-4 p-4 flex-col sm:items-start items-stretch bg-white border border-slate-300 rounded-sm">
          <TasksList
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            globalFilter={query}
            setGlobalFilter={setQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
