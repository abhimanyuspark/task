import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div
      className={
        className +
        " flex gap-3 flex-col text-sm/6 font-medium text-gray-900 w-full"
      }
    >
      <label
        htmlFor={name}
        className="cursor-pointer block text-sm/6 font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
          error
            ? "outline-red-500 focus:outline-red-600"
            : "outline-gray-300 focus:outline-indigo-600"
        }`}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      />

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

const Select = ({ value, onChange, children, label }) => {
  return (
    <div className="flex gap-3 flex-col text-sm/6 font-medium text-gray-900">
      <label htmlFor={label} className="cursor-pointer">{label}</label>
      <select
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="border border-slate-300 p-2 rounded-sm"
      >
        {children}
      </select>
    </div>
  );
};

export { Input, Select };
