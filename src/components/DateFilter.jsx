import React from "react";

const DateFilter = ({ onChange, value = [{ value: ["", ""] }] }) => {
  return (
    <div className="flex gap-4 items-center sm:flex-row flex-col w-full sm:w-auto">
      <label className="flex items-center gap-2 border border-slate-300 rounded-sm px-2 py-1 w-full sm:w-auto">
        <span className="text-sm font-semibold w-24 sm:w-auto">Start Date</span>
        <input
          type="date"
          value={value[0]?.value[0] || ""}
          max={value[0]?.value[1] || ""}
          className="w-full sm:w-auto"
          onChange={(e) => onChange(e.target.value, value[0]?.value[1] || "")}
        />
      </label>
      <label className="flex items-center gap-2 border border-slate-300 rounded-sm px-2 py-1 w-full sm:w-auto">
        <span className="text-sm font-semibold w-24 sm:w-auto">End Date</span>
        <input
          type="date"
          value={value[0]?.value[1] || ""}
          min={value[0]?.value[0] || ""}
          className="w-full sm:w-auto"
          onChange={(e) => onChange(value[0]?.value[0] || "", e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateFilter;