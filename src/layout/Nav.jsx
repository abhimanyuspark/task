import React from "react";

const Nav = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
          className="size-8"
        />
      </div>
      <h3 className="text-l font-bold">Tasks App</h3>
    </div>
  );
};

export default Nav;
