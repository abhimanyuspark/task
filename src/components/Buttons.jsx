import React from "react";

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

export { Button, CancelButton };
