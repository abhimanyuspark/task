import React from "react";

const DateFilter = ({ onChange, value }) => {
  return (
    <div className="flex gap-2 items-center sm:flex-row flex-col">
      <label className="flex items-center gap-2 border border-slate-300 rounded-sm p-2">
        <span className="text-sm font-semibold">Start Date</span>
        <input
          type="date"
          onChange={(e) => onChange(e.target.value, value[0]?.value[1] || new Date())}
        />
      </label>
      <label className="flex items-center gap-2 border border-slate-300 rounded-sm p-2">
        <span className="text-sm font-semibold">End Date</span>
        <input
          type="date"
          onChange={(e) => onChange(value[0]?.value[0] || new Date(), e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateFilter;
