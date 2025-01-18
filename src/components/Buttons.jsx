import React from "react";
import { FaList, FaTimes, FiGrid } from "./Icons";

const Loader = () => {
  return (
    <div className="w-4 h-4 mx-auto loader ease-linear rounded-full border-2 border-white"></div>
  );
};

const Button = ({
  height = "40px",
  icon = "",
  text = "Submit",
  onClick,
  type = "submit",
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ height: height, transition: "all 0.2s ease" }}
      className="px-3 bg-blue-600 flex justify-center items-center rounded-sm text-white hover:bg-black"
    >
      <div className="flex items-center gap-3">
        {loading ? <Loader /> : icon}
        <span className="text-lg">{loading ? "Loading..." : text}</span>
      </div>
    </button>
  );
};

const CancelButton = ({
  height = "40px",
  text = "Cancel",
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ height: height, transition: "all 0.2s ease" }}
      className="px-3 flex justify-center items-center rounded-sm font-semibold hover:text-white text-black hover:bg-black"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{text}</span>
      </div>
    </button>
  );
};

const ClearButton = ({
  text = "Clear",
  onClick,
  icon = "",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ transition: "all 0.2s ease" }}
      className="px-2 py-1.5 flex justify-center items-center rounded-sm font-semibold border border-black hover:bg-black hover:text-white sm:w-auto w-full"
    >
      <div className="flex items-center gap-1">
        {icon || <FaTimes className="size-4" />}
        <span className="text-sm">{text}</span>
      </div>
    </button>
  );
};

const SwitchButton = ({ onClick, value }) => {
  return (
    <div
      className="relative text-white h-10 rounded-sm bg-black w-20"
      onClick={onClick}
    >
      <div
        className={`p-4 transition-all absolute bg-white top-1 z-1 ${
          value === "list" ? "left-1" : "translate-x-11"
        }`}
      ></div>
      <div className={`absolute z-2 top-0.5 left-0.5 flex items-center gap-1`}>
        <div className="p-2">
          <FaList
            className={`size-5 ${
              value === "list" ? "text-black" : "text-white"
            }`}
          />
        </div>

        <div className="p-1.5">
          <FiGrid
            className={`size-6 ${
              value === "grid" ? "text-black" : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export { Button, CancelButton, ClearButton, SwitchButton };
