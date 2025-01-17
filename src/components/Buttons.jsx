import React from "react";
import { FaTimes } from "./Icons"

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
  icon="",
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

export { Button, CancelButton, ClearButton };
